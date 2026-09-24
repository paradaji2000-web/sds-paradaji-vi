import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  schoolInfo,
  testimonialsList,
} from "@/data/dummy";
import { formatDate, generateWhatsAppLink } from "@/lib/utils";
import { getNews } from "@/server/actions/news";
import { getExtracurriculars } from "@/server/actions/extracurriculars";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const newsList = await getNews(1, 3);
  const featuredEkskulList = await getExtracurriculars();
  
  const latestNews = newsList;
  const featuredEkskul = featuredEkskulList.slice(0, 3);

  const heroWhatsAppUrl = generateWhatsAppLink(
    schoolInfo.whatsapp,
    "Halo Admin SDS Paradjai VI, saya ingin menanyakan info pendaftaran murid baru tahun ajaran 2025/2026."
  );

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Registration status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary animate-pulse">
                <Sparkles className="h-4 w-4" />
                <span>PPDB Tahun Ajaran 2025/2026 Telah Dibuka!</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Membentuk Generasi{" "}
                <span className="text-primary underline decoration-secondary decoration-wavy decoration-2">
                  Berakhlak Mulia
                </span>
                , Cerdas, dan Berprestasi.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Selamat datang di <strong>{schoolInfo.name}</strong>. Kami
                memadukan kurikulum nasional yang bermutu dengan pembiasaan
                adab islami, metode tahfidz ramah anak, dan pengenalan literasi
                teknologi sejak dini.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/ppdb/daftar">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Daftar PPDB Online
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Tanya via WhatsApp
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/70 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                    A
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    Akreditasi Unggul
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                    28
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    Maks. Murid / Kelas
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                    100%
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    Lulusan Hafal Al-Qur'an
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=900"
                  alt="Siswa-siswi ceria SDS Paradjai VI"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="inline-block rounded-full bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 w-max mb-2">
                    Karakter & Kreativitas
                  </span>
                  <p className="font-heading text-base font-bold">
                    Pembelajaran Aktif, Nyaman, dan Menginspirasi Setiap Hari.
                  </p>
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-5 -left-4 sm:bottom-4 sm:-left-6 rounded-2xl bg-card border border-border/90 p-4 shadow-xl flex items-center gap-3.5 max-w-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    Program Tahfidz Terpadu
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Metode Ummi dengan Asatidz Bersanad
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA SEKOLAH */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-border/80 bg-muted/30 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Kepala Sekolah */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-full overflow-hidden border-4 border-primary shadow-xl mb-4">
                <img
                  src={schoolInfo.headmaster.avatarUrl}
                  alt={schoolInfo.headmaster.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {schoolInfo.headmaster.name}
              </h3>
              <p className="text-xs font-semibold text-primary">
                Kepala Sekolah SDS Paradjai VI
              </p>
            </div>

            {/* Pesan Sambutan */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Sambutan Pimpinan Sekolah</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                "Membina Fitrah Belajar Anak dengan Penuh Cinta dan Akhlak Mulia"
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                "{schoolInfo.headmaster.welcomeMessage}"
              </p>
              <div className="pt-2">
                <Link href="/tentang">
                  <Button variant="outline" size="sm" className="font-semibold">
                    Baca Profil Lengkap Sekolah
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM UNGGULAN (BENTO GRID) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="default">Keunggulan Pendidikan</Badge>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground">
            Mengapa Memilih SDS Paradjai VI?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Kurikulum seimbang yang mengintegrasikan kecerdasan spiritual,
            intelektual, dan keterampilan abad ke-21.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverable className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Tahfidz & Adab Islami
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Target hafalan Juz 30 dan 29 menggunakan metode Ummi yang menyenangkan
              serta pembiasaan ibadah salat berjamaah sejak dini.
            </p>
          </Card>

          <Card hoverable className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Coding & Sains Cilik
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pengenalan pemrograman visual Scratch, logika komputasi, dan
              praktikum sains interaktif di laboratorium komputer berfasilitas lengkap.
            </p>
          </Card>

          <Card hoverable className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Guru Berdedikasi
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tenaga pengajar berkualifikasi S1/S2 pendidikan yang sabar, telaten,
              dan memahami psikologi perkembangan anak usia sekolah dasar.
            </p>
          </Card>

          <Card hoverable className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Lingkungan Aman & Ber-AC
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ruang belajar sejuk ber-AC, proyektor interaktif, pengawasan CCTV 24
              jam, dan kantin sehat tanpa bahan pengawet berbahaya.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. BERITA & KEGIATAN TERBARU */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <Badge variant="default">Kabar Sekolah</Badge>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Berita & Prestasi Terkini
            </h2>
            <p className="text-sm text-muted-foreground">
              Ikuti informasi kegiatan belajar, perlombaan, dan pengumuman resmi SDS Paradjai VI.
            </p>
          </div>
          <Link href="/berita">
            <Button variant="outline" className="font-semibold">
              Lihat Semua Berita
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <Card
              key={news.id}
              hoverable
              className="flex flex-col overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={news.thumbnailUrl || "/images/placeholder.jpg"}
                  alt={news.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="font-bold shadow-xs">
                    {news.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(news.publishedAt || news.createdAt)}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>

                <Link
                  href={`/berita/${news.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
                >
                  Baca Selengkapnya
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. HIGHLIGHT EKSTRAKURIKULER */}
      <section className="bg-muted/30 py-16 sm:py-20 border-y border-border/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <Badge variant="default">Minat & Bakat</Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                Ekstrakurikuler Pilihan
              </h2>
              <p className="text-sm text-muted-foreground">
                Wadah penyaluran bakat anak di bidang keagamaan, sains teknologi, seni, dan olahraga.
              </p>
            </div>
            <Link href="/ekstrakurikuler">
              <Button variant="outline" className="font-semibold">
                Lihat Semua Ekskul
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEkskul.map((ekskul) => (
              <Card key={ekskul.id} hoverable className="overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={ekskul.imageUrl || "/images/placeholder.jpg"}
                    alt={ekskul.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="accent" className="font-semibold">
                      Unggulan
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {ekskul.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Jadwal: {ekskul.schedule}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {ekskul.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI ORANG TUA MURID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="default">Kata Orang Tua</Badge>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground">
            Pengalaman Belajar di SDS Paradjai VI
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Kepercayaan dan apresiasi nyata dari para wali murid yang mempercayakan
            putra-putrinya bersama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsList.map((testi) => (
            <Card key={testi.id} className="p-6 flex flex-col justify-between space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{testi.content}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/70">
                <img
                  src={testi.avatarUrl}
                  alt={testi.parentName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {testi.parentName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Orang tua {testi.studentName} ({testi.grade})
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER DAFTAR PPDB */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-primary to-emerald-800 p-8 sm:p-12 lg:p-16 text-primary-foreground shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block rounded-full bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1">
              Kuota Terbatas: Hanya 60 Kursi
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Siapkan Masa Depan Gemilang Ananda Bersama SDS Paradjai VI
            </h2>
            <p className="text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
              Daftarkan putra-putri Anda secara online dalam 5 menit. Dapatkan
              bebas biaya formulir dan gratis seragam olahraga bagi 20 pendaftar
              pertama.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/ppdb/daftar">
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-bold shadow-lg text-secondary-foreground"
                >
                  Daftar Sekarang Juga
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/ppdb">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold border-white/40 text-white hover:bg-white/10"
                >
                  Pelajari Syarat & Alur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
