import { Metadata } from "next";
import GaleriClient from "./GaleriClient";

export const metadata: Metadata = { title: "Kelola Galeri" };

export default function AdminGaleriPage() {
  return (
    <div className="space-y-6">
      <GaleriClient />
    </div>
  );
}
