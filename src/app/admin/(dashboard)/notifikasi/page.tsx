import { Metadata } from "next";
import NotifikasiClient from "./NotifikasiClient";

export const metadata: Metadata = { title: "Notifikasi & Pesan" };

export default function AdminNotifikasiPage() {
  return <NotifikasiClient />;
}
