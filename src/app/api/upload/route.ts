import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string || "general";

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate size (max 2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (buffer.length > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 2MB limit." }, { status: 400 });
    }

    // Validate MIME type
    const validMimeTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed." },
        { status: 400 }
      );
    }

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filename = `${type}-${uniqueSuffix}-${originalName}`;

    // TODO: Production Upload to Bunny Storage CDN
    // const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
    // const BUNNY_STORAGE_ACCESS_KEY = process.env.BUNNY_STORAGE_ACCESS_KEY;
    // const BUNNY_CDN_URL = process.env.BUNNY_CDN_URL;
    // if (process.env.NODE_ENV === "production" && BUNNY_STORAGE_ZONE && BUNNY_STORAGE_ACCESS_KEY) {
    //   // Implementation for BunnyCDN upload will go here
    // }

    // Development / Fallback Upload (Local to /public/uploads)
    const uploadDir = join(process.cwd(), "public", "uploads", type);
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${type}/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      name: filename,
      size: buffer.length,
      type: file.type
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
