import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ppdbFaqList } from "@/data/dummy";

export const metadata: Metadata = {
  title: "Pusat Informasi PPDB Online 2025/2026",
  description:
    "Informasi lengkap pendaftaran siswa baru SDS Paradjai VI: alur pendaftaran, jadwal gelombang, syarat berkas, dan formulir pendaftaran online.",
};

export default function PPDBInfoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-16">
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-emerald-800 to-teal-900 p-8 sm:p-14 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-xs font-extrabold shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Penerimaan Peserta Didik Baru (PPDB) TA 2025/2026</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Pintu Awal Menuju Generasi Cerdas & Berakhlak Al-Qur'an
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl">
            Pendaftaran kini semakin praktis. Seluruh proses pengisian data dan
            unggah berkas dapat dilakukan secara online langsung dari smartphone Anda,
            tanpa perlu mengantre.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/ppdb/daftar">
              <Button
                variant="secondary"
                size="lg"
                className="font-bold shadow-lg text-secondary-foreground"
              >
                Isi Formulir Pendaftaran Sekarang
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ppdb/status">
              <Button
                variant="outline"
                size="lg"
                className="font-bold border-white/30 text-white hover:bg-white/10"
              >
                Cek Status Pendaftaran Saya
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Jadwal Gelombang & Kuota */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="default">Jadwal Seleksi</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Jadwal Gelombang Pendaftaran
          </h2>
          <p className="text-sm text-muted-foreground">
            Total kuota yang tersedia: <strong>60 Murid</strong> (Maks. 28 anak per rombel).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gelombang 1 */}
          <Card className="p-8 border-primary/40 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-4 py-1 rounded-bl-2xl text-xs font-bold">
              Sedang Berjalan
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Gelombang I (Prioritas)
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground">
                10 Februari – 31 Maret 2025
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Gratis Biaya Formulir Pendaftaran Online</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Gratis 1 Set Seragam Olahraga Sekolah</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Wawancara Pemetaan Minat: 5 – 8 April 2025</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/ppdb/daftar" className="block">
                  <Button variant="default" className="w-full font-bold">
                    Daftar Gelombang 1
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Gelombang 2 */}
          <Card className="p-8 border-border relative overflow-hidden shadow-md">
            <div className="space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Gelombang II (Reguler)
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground">
                1 April – 30 Juni 2025
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Dibuka selama sisa kuota murid masih tersedia</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Proses verifikasi berkas 2 hari kerja</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Pengumuman langsung via WhatsApp resmi</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/ppdb/daftar" className="block">
                  <Button variant="outline" className="w-full font-bold">
                    Daftar Gelombang 2
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Alur 4 Langkah Pendaftaran */}
      <section className="bg-muted/30 py-16 px-6 sm:px-10 rounded-3xl border border-border/80 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="default">Kemudahan Layanan</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Alur 4 Langkah Pendaftaran Online
          </h2>
          <p className="text-sm text-muted-foreground">
            Cepat, transparan, dan dapat dipantau setiap saat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3 p-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-heading text-xl font-extrabold shadow-md">
              1
            </div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Isi Data Diri Online
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Lengkapi formulir identitas siswa, orang tua, dan alamat rumah secara runtut.
            </p>
          </div>

          <div className="space-y-3 p-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground font-heading text-xl font-extrabold shadow-md">
              2
            </div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Unggah Dokumen Berkas
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Foto / scan Kartu Keluarga, Akta Lahir, dan Pas Foto anak dari HP Anda.
            </p>
          </div>

          <div className="space-y-3 p-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white font-heading text-xl font-extrabold shadow-md">
              3
            </div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Konfirmasi via WhatsApp
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dapatkan nomor registrasi dan kirimkan data otomatis ke WhatsApp panitia.
            </p>
          </div>

          <div className="space-y-3 p-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white font-heading text-xl font-extrabold shadow-md">
              4
            </div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Verifikasi & Observasi
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Panitia memverifikasi berkas dan mengundang observasi gaya belajar anak.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Persyaratan Berkas */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="default">Persiapan Pendaftaran</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Dokumen Persyaratan Berkas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-heading font-bold text-foreground text-sm">
              Akta Kelahiran Anak
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Scan/foto asli yang jelas. Usia prioritas minimal 6-7 tahun per 1 Juli.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-heading font-bold text-foreground text-sm">
              Kartu Keluarga (KK)
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Scan/foto Kartu Keluarga terbaru yang memuat nama calon siswa dan orang tua.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-heading font-bold text-foreground text-sm">
              Pas Foto Berwarna 3x4
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Foto formal anak dengan latar belakang merah atau biru (2 lembar).
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-heading font-bold text-foreground text-sm">
              Ijazah / Surat Keterangan TK
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Surat tanda tamat belajar TK/RA (opsional dan dapat menyusul).
            </p>
          </Card>
        </div>
      </section>

      {/* 5. Tanya Jawab (FAQ) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="default">Bantuan Informasi</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Pertanyaan Yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {ppdbFaqList.map((faq, idx) => (
            <Card key={idx} className="p-6 space-y-2">
              <h4 className="font-heading font-bold text-foreground text-base flex items-start gap-2.5">
                <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7.5">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
