import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link href="/" className="mb-6 flex items-center justify-center">
          <div className="bg-primary/10 p-3 rounded-full mr-3">
            <span className="text-primary font-bold text-2xl">S</span>
          </div>
          <span className="text-xl font-bold font-heading text-neutral-900">SDS PARADAJI VI</span>
        </Link>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-neutral-900 font-heading">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Masuk ke dashboard untuk mengelola website
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary-dark text-white",
                card: "shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                dividerLine: "bg-neutral-200",
                dividerText: "text-neutral-500",
                formFieldLabel: "text-neutral-700",
                formFieldInput: "rounded-md border-neutral-300 focus:ring-primary focus:border-primary",
                footerAction: "hidden"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
