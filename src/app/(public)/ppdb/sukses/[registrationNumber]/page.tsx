import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  Search,
  ArrowRight,
  Printer,
  Home,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { schoolInfo } from "@/data/dummy";
import { generateWhatsAppLink, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ registrationNumber: string }>;
}

export default async function PPDBSuksesPage({ params }: PageProps) {
  const { registrationNumber } = await params;

  const today = new Date();
  const formattedToday = formatDate(today);

  // Template Pesan WhatsApp Konfirmasi Otomatis
  const waMessage = `*KONFIRMASI PENDAFTARAN PPDB ONLINE*
Sekolah: ${schoolInfo.name}

Assalamu'alaikum Admin Panitia PPDB,
Saya telah menyelesaikan pengisian formulir pendaftaran murid baru melalui website:

• *No. Registrasi*: ${registrationNumber}
• *Tanggal Pengisian*: ${formattedToday}
• *Status*: Menunggu Verifikasi Berkas

Mohon informasi terkait jadwal verifikasi berkas dan observasi ananda selanjutnya. Terima kasih.`;

  const waUrl = generateWhatsAppLink(schoolInfo.whatsapp, waMessage);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 space-y-8">
      {/* Success Card */}
      <Card className="overflow-hidden border-border/80 shadow-2xl">
        {/* Header Ribbon */}
        <div className="bg-primary px-6 py-8 text-center text-primary-foreground space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Pendaftaran Berhasil Dikirim!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
            Data calon siswa telah tersimpan di sistem PPDB online {schoolInfo.name}.
          </p>
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Registration Number Box */}
          <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5 text-center space-y-1.5">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Nomor Registrasi Resmi Anda
            </span>
            <div className="font-heading text-2xl sm:text-3xl font-black text-primary tracking-wider">
              {registrationNumber}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Simpan dan catat nomor ini untuk pengecekan status verifikasi berkas.
            </p>
          </div>

          {/* Status Badge & Guide */}
          <div className="space-y-3 rounded-2xl bg-muted/40 p-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status Pendaftaran:</span>
              <Badge variant="pending" className="font-bold">
                Menunggu Verifikasi Berkas
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tanggal Pendaftaran:</span>
              <span className="font-semibold text-foreground">{formattedToday}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Biaya Pendaftaran:</span>
              <span className="font-bold text-emerald-600">GRATIS (Gelombang 1)</span>
            </div>
          </div>

          {/* Primary Action: Send to WhatsApp */}
          <div className="space-y-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Kirim Konfirmasi ke WhatsApp Admin
              </Button>
            </a>
            <p className="text-center text-[11px] text-muted-foreground">
              *Klik tombol di atas untuk mengirimkan nomor registrasi langsung ke admin panitia PPDB via WhatsApp.
            </p>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border">
            <Link href="/ppdb/status">
              <Button variant="outline" className="w-full font-semibold gap-1.5 text-xs">
                <Search className="h-4 w-4" />
                Cek Status Pendaftaran
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full font-semibold gap-1.5 text-xs">
                <Home className="h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
