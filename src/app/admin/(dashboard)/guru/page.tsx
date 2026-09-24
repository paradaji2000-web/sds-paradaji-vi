import { Metadata } from "next";
import GuruClient from "./GuruClient";

export const metadata: Metadata = { title: "Kelola Dewan Guru" };

export default function AdminGuruPage() {
  return (
    <div className="space-y-6">
      <GuruClient />
    </div>
  );
}
