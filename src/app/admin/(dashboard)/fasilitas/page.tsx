import { Metadata } from "next";
import FasilitasClient from "./FasilitasClient";

export const metadata: Metadata = { title: "Kelola Fasilitas" };

export default function AdminFasilitasPage() {
  return (
    <div className="space-y-6">
      <FasilitasClient />
    </div>
  );
}
