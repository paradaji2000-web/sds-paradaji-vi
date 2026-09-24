import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Newspaper,
  School,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dummyRegistrations, newsList, teachersList } from "@/data/dummy";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard Administrator",
};

export default function AdminDashboardPage() {
  const totalPendaftar = dummyRegistrations.length + 43; // Mock total: 48
  const pendingCount = 12;
  const verifiedCount = 18;
  const acceptedCount = 16;
  const rejectedCount = 2;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-primary p-6 sm:p-8 text-primary-foreground shadow-lg">
        <div className="space-y-2">
          <span className="inline-block rounded-full bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1">
            Tahun Ajaran 2025/2026
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Selamat Datang di Panel Admin Sekolah
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            Pantau arus pendaftaran PPDB online secara langsung, verifikasi dokumen
            calon peserta didik, dan kelola informasi publik SDS Paradjai VI.
          </p>
        </div>
        <div>
          <Link href="/admin/ppdb">
            <Button variant="secondary" className="font-bold shadow-md">
              Kelola Pendaftar PPDB
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 border-border/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              Total Pendaftar
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-extrabold text-foreground">
              {totalPendaftar}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              +8 pendaftar minggu ini
            </p>
          </div>
        </Card>

        <Card className="p-5 border-border/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase">
              Menunggu Verifikasi
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-extrabold text-foreground">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Perlu ditinjau oleh panitia
            </p>
          </div>
        </Card>

        <Card className="p-5 border-border/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase">
              Diterima
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-extrabold text-foreground">
              {acceptedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Dari 60 kuota kursi tersedia (27%)
            </p>
          </div>
        </Card>

        <Card className="p-5 border-border/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 uppercase">
              Ditolak / Belum Usia
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-extrabold text-foreground">
              {rejectedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tidak memenuhi syarat usia
            </p>
          </div>
        </Card>
      </div>

      {/* 2-Column: Recent Registrations & Quick Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Recent Registrations Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Pendaftar PPDB Terbaru
            </h3>
            <Link
              href="/admin/ppdb"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Lihat Semua Pendaftar
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Card className="overflow-hidden border-border/80 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-muted/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">No. Registrasi</th>
                    <th className="p-3.5">Nama Calon Murid</th>
                    <th className="p-3.5">Asal TK</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dummyRegistrations.slice(0, 5).map((reg) => (
                    <tr key={reg.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-primary">
                        {reg.registrationNumber}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-foreground">{reg.fullName}</div>
                        <div className="text-[11px] text-muted-foreground">{reg.parentName}</div>
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {reg.previousSchool || "-"}
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            reg.status === "accepted"
                              ? "accepted"
                              : reg.status === "verified"
                              ? "verified"
                              : reg.status === "rejected"
                              ? "rejected"
                              : "pending"
                          }
                          className="text-[10px]"
                        >
                          {reg.status === "accepted"
                            ? "Diterima"
                            : reg.status === "verified"
                            ? "Terverifikasi"
                            : reg.status === "rejected"
                            ? "Ditolak"
                            : "Pending"}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link href={`/admin/ppdb/${reg.id}`}>
                          <Button size="sm" variant="outline" className="text-xs h-8 px-3">
                            Tinjau
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Col: Quick Links & Summary */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-border/80 shadow-md space-y-4">
            <h3 className="font-heading text-base font-bold text-foreground">
              Aksi Cepat Admin
            </h3>
            <div className="space-y-2.5">
              <Link href="/admin/berita" className="block">
                <div className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Newspaper className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-foreground">Kelola Berita ({newsList.length})</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </Link>

              <Link href="/admin/guru" className="block">
                <div className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/20 text-secondary-foreground">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-foreground">Data Guru ({teachersList.length})</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </Link>

              <Link href="/admin/pengaturan" className="block">
                <div className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-foreground">Template WhatsApp PPDB</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </Card>

          {/* Kuota Card */}
          <Card className="p-6 border-border/80 shadow-md space-y-3 bg-muted/20">
            <h4 className="font-heading text-sm font-bold text-foreground">
              Status Kuota Siswa Baru
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Terisi: 16 dari 60 Kursi</span>
                <span className="text-primary font-bold">27%</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border border-border/40">
                <div className="h-full bg-primary rounded-full" style={{ width: "27%" }} />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Sisa kuota: <strong>44 kursi</strong> lagi untuk 2 rombongan belajar.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
