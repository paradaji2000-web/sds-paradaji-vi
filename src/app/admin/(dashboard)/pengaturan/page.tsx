import { Metadata } from "next";
import PengaturanClient from "./PengaturanClient";

export const metadata: Metadata = { title: "Pengaturan Website" };

export default function AdminPengaturanPage() {
  return <PengaturanClient />;
}
