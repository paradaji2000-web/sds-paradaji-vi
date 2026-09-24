import { Metadata } from "next";
import EkskulClient from "./EkskulClient";

export const metadata: Metadata = {
  title: "Kelola Ekstrakurikuler",
};

export default function AdminEkstrakurikulerPage() {
  return (
    <div className="space-y-6">
      <EkskulClient />
    </div>
  );
}
