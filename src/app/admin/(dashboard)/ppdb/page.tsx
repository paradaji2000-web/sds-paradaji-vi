import { Metadata } from "next";
import { PPDBTableClient } from "@/components/admin/PPDBTableClient";
import { dummyRegistrations } from "@/data/dummy";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Kelola Pendaftar PPDB",
};

export default function AdminPPDBPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground">
            Pendaftar PPDB
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data pendaftaran siswa baru secara langsung.
          </p>
        </div>
      </div>
      <PPDBTableClient initialData={dummyRegistrations} />
    </div>
  );
}
