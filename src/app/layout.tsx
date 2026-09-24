import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SDS PARADAJI VI — Portal Informasi & PPDB Online",
    template: "%s | SDS PARADAJI VI",
  },
  description:
    "Website resmi SDS Paradjai VI. Portal informasi profil sekolah, kegiatan, guru, fasilitas, dan pendaftaran murid baru (PPDB) online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable}`}>
        <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
