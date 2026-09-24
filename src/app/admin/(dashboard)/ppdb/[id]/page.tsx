import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, CheckCircle, FileText, XCircle, AlertTriangle } from "lucide-react";
import { dummyRegistrations } from "@/data/dummy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Detail Pendaftar PPDB",
};

export default async function PPDBDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const registration = dummyRegistrations.find((r) => r.id === id);

  if (!registration) {
    notFound();
    return null; // Unreachable, tapi membantu TypeScript
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/ppdb">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground">
            Detail Pendaftar
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            No. Registrasi: <span className="font-mono font-bold text-primary">{registration.registrationNumber}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-heading font-bold border-b border-border pb-2">
              Data Calon Siswa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Nama Lengkap</span>
                <span className="font-semibold text-foreground">{registration.fullName}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Nama Panggilan</span>
                <span className="font-medium text-foreground">{registration.nickname}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Jenis Kelamin</span>
                <span className="font-medium text-foreground">{registration.gender}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Tempat, Tanggal Lahir</span>
                <span className="font-medium text-foreground">{registration.birthPlace}, {formatDate(registration.birthDate)}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">NIK</span>
                <span className="font-mono text-foreground">{registration.nik}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Agama</span>
                <span className="font-medium text-foreground">{registration.religion}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Asal Sekolah (TK/RA)</span>
                <span className="font-medium text-foreground">{registration.previousSchool}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-heading font-bold border-b border-border pb-2">
              Data Orang Tua / Wali
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Nama Orang Tua</span>
                <span className="font-semibold text-foreground">{registration.parentName}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">Pekerjaan</span>
                <span className="font-medium text-foreground">{registration.parentJob}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs mb-1">No. WhatsApp</span>
                <span className="font-medium text-foreground">{registration.parentPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-muted-foreground text-xs mb-1">Alamat Lengkap</span>
                <span className="font-medium text-foreground">{registration.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
            <h3 className="font-heading font-bold text-foreground">Status Pendaftaran</h3>
            <div>
              <Badge
                variant={
                  registration.status === "accepted"
                    ? "accepted"
                    : registration.status === "verified"
                    ? "verified"
                    : registration.status === "rejected"
                    ? "rejected"
                    : "pending"
                }
                className="text-sm px-4 py-1"
              >
                {registration.status === "accepted"
                  ? "Diterima"
                  : registration.status === "verified"
                  ? "Terverifikasi"
                  : registration.status === "rejected"
                  ? "Ditolak"
                  : "Pending"}
              </Badge>
            </div>
            {registration.adminNotes && (
              <div className="bg-muted p-3 rounded-xl text-xs text-muted-foreground mt-4">
                <strong>Catatan Admin:</strong> <br />
                {registration.adminNotes}
              </div>
            )}
            
            <div className="pt-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Ubah Status:</p>
              <Button variant="outline" className="w-full justify-start text-sky-600 border-sky-200 hover:bg-sky-50">
                <CheckCircle className="mr-2 h-4 w-4" /> Tandai Terverifikasi
              </Button>
              <Button variant="outline" className="w-full justify-start text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                <CheckCircle className="mr-2 h-4 w-4" /> Terima Siswa
              </Button>
              <Button variant="outline" className="w-full justify-start text-rose-600 border-rose-200 hover:bg-rose-50">
                <XCircle className="mr-2 h-4 w-4" /> Tolak Berkas
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
            <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Kelengkapan Berkas
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Kartu Keluarga</span>
                {registration.documents.kk ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Ada</Badge>
                ) : (
                  <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Belum</Badge>
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Akta Kelahiran</span>
                {registration.documents.akta ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Ada</Badge>
                ) : (
                  <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Belum</Badge>
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Pas Foto 3x4</span>
                {registration.documents.foto ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Ada</Badge>
                ) : (
                  <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Belum</Badge>
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Ijazah TK/RA</span>
                {registration.documents.ijazahTk ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Ada</Badge>
                ) : (
                  <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200">Opsional</Badge>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
