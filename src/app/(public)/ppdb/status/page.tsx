"use client";

import * as React from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  User,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyRegistrations, schoolInfo, PPDBRegistration } from "@/data/dummy";
import { generateWhatsAppLink, formatDate } from "@/lib/utils";

export default function PPDBStatusPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searched, setSearched] = React.useState(false);
  const [result, setResult] = React.useState<PPDBRegistration | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();

    // Look in dummy registrations or local storage
    let found = dummyRegistrations.find(
      (r) =>
        r.registrationNumber.toUpperCase() === query ||
        r.nik === query ||
        r.fullName.toUpperCase().includes(query)
    );

    if (!found && typeof window !== "undefined") {
      const localData = localStorage.getItem(`sds_ppdb_${query}`);
      if (localData) {
        found = JSON.parse(localData);
      }
    }

    setResult(found || null);
    setSearched(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge variant="accepted">Diterima Menjadi Siswa Baru</Badge>;
      case "verified":
        return <Badge variant="verified">Berkas Terverifikasi (Jadwal Observasi)</Badge>;
      case "rejected":
        return <Badge variant="rejected">Belum Memenuhi Syarat</Badge>;
      default:
        return <Badge variant="pending">Menunggu Verifikasi Panitia</Badge>;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="default">Lacak Pendaftaran</Badge>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground">
          Cek Status Verifikasi Berkas PPDB
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Masukkan Nomor Registrasi (contoh: <code>PPDB-2025-0001</code>) atau NIK
          calon siswa untuk melihat progres verifikasi.
        </p>
      </div>

      {/* Search Form Card */}
      <Card className="p-6 border-border/80 shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              required
              placeholder="Masukkan No. Registrasi (contoh: PPDB-2025-0001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 uppercase"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="font-bold shadow-sm sm:w-36"
          >
            Cari Status
          </Button>
        </form>

        {/* Quick Hint */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground px-1">
          <span>Contoh untuk mencoba:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSearchQuery("PPDB-2025-0001")}
              className="text-primary hover:underline font-mono font-bold"
            >
              PPDB-2025-0001
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setSearchQuery("PPDB-2025-0002")}
              className="text-primary hover:underline font-mono font-bold"
            >
              PPDB-2025-0002
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setSearchQuery("PPDB-2025-0003")}
              className="text-primary hover:underline font-mono font-bold"
            >
              PPDB-2025-0003
            </button>
          </div>
        </div>
      </Card>

      {/* Search Result Display */}
      {searched && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          {result ? (
            <Card className="overflow-hidden border-border/80 shadow-xl space-y-6 p-6 sm:p-8">
              {/* Header Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {result.registrationNumber}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {result.fullName}
                  </h3>
                </div>
                <div>{getStatusBadge(result.status)}</div>
              </div>

              {/* Data Detail Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="rounded-xl bg-muted/40 p-3.5 space-y-1">
                  <span className="text-muted-foreground text-xs">Asal Sekolah TK:</span>
                  <div className="font-bold text-foreground">{result.previousSchool || "-"}</div>
                </div>

                <div className="rounded-xl bg-muted/40 p-3.5 space-y-1">
                  <span className="text-muted-foreground text-xs">Nama Orang Tua/Wali:</span>
                  <div className="font-bold text-foreground">{result.parentName}</div>
                </div>

                <div className="rounded-xl bg-muted/40 p-3.5 space-y-1">
                  <span className="text-muted-foreground text-xs">Tanggal Pendaftaran:</span>
                  <div className="font-bold text-foreground">{formatDate(result.createdAt)}</div>
                </div>

                <div className="rounded-xl bg-muted/40 p-3.5 space-y-1">
                  <span className="text-muted-foreground text-xs">Alamat Domisili:</span>
                  <div className="font-bold text-foreground line-clamp-1">{result.address}</div>
                </div>
              </div>

              {/* Admin Note Box */}
              {result.adminNotes && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-1">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Catatan dari Panitia PPDB:
                  </span>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed pl-5.5">
                    {result.adminNotes}
                  </p>
                </div>
              )}

              {/* WhatsApp Support CTA */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground text-center sm:text-left">
                  Butuh bantuan konfirmasi lebih lanjut?
                </span>
                <a
                  href={generateWhatsAppLink(
                    schoolInfo.whatsapp,
                    `Halo Admin, saya ingin menanyakan perkembangan verifikasi nomor registrasi ${result.registrationNumber} atas nama ${result.fullName}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="sm" className="font-bold gap-1.5">
                    <MessageCircle className="h-4 w-4" />
                    Hubungi Panitia via WhatsApp
                  </Button>
                </a>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center space-y-3 border-dashed border-border">
              <XCircle className="mx-auto h-10 w-10 text-muted-foreground" />
              <h4 className="font-heading text-base font-bold text-foreground">
                Nomor Registrasi Tidak Ditemukan
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Pastikan format nomor registrasi sesuai dengan yang tertera pada bukti
                pendaftaran Anda (misal: <code>PPDB-2025-0001</code>).
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
