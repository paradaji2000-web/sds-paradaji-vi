import { Metadata } from "next";
import BeritaClient from "./BeritaClient";

export const metadata: Metadata = { title: "Kelola Berita" };

export default function AdminBeritaPage() {
  return (
    <div className="space-y-6">
      <BeritaClient />
    </div>
  );
}
