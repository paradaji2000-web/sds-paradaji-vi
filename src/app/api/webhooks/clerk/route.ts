import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as unknown as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    if (!id || !email_addresses || email_addresses.length === 0) {
      return new Response('Error occured -- no user data', {
        status: 400,
      })
    }

    const email = email_addresses[0].email_address
    const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Unknown'
    const isSuperAdmin = email === process.env.SUPER_ADMIN_EMAIL
    
    try {
      if (eventType === 'user.created') {
        await db.insert(users).values({
          clerkUserId: id,
          email,
          fullName,
          avatarUrl: image_url,
          role: isSuperAdmin ? 'super_admin' : 'admin',
        }).onConflictDoUpdate({
          target: users.clerkUserId,
          set: {
            email,
            fullName,
            avatarUrl: image_url,
            role: isSuperAdmin ? 'super_admin' : 'admin',
            updatedAt: new Date()
          }
        })
      } else if (eventType === 'user.updated') {
        await db.update(users)
          .set({
            email,
            fullName,
            avatarUrl: image_url,
            updatedAt: new Date()
          })
          .where(eq(users.clerkUserId, id))
      }
    } catch (error) {
      console.error('Error updating user in database:', error)
      return new Response('Error saving user data', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (!id) {
      return new Response('Error occured -- no user data', {
        status: 400,
      })
    }

    try {
      // Soft deactivate per PRD & Auth security guidelines
      await db
        .update(users)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(users.clerkUserId, id));
    } catch (error) {
      console.error('Error deactivating user in database:', error);
      return new Response('Error deactivating user data', { status: 500 });
    }
  }

  return new Response('', { status: 200 })
}
