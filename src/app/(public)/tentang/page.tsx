import { Metadata } from "next";
import {
  ShieldCheck,
  Target,
  Compass,
  HeartHandshake,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { schoolInfo } from "@/data/dummy";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil lengkap SDS Paradjai VI, sejarah pendirian, visi misi sekolah, tujuan pendidikan, dan struktur organisasi.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-20 py-12">
      {/* 1. Header Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 text-center space-y-4">
        <Badge variant="default">Profil Sekolah</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
          Mengenal Lebih Dekat {schoolInfo.name}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Lembaga pendidikan dasar yang berkomitmen memadukan nilai keislaman,
          kecintaan pada Al-Qur’an, keunggulan sains, dan penguatan budi pekerti
          sejak tahun 2010 di Cilandak, Jakarta Selatan.
        </p>
      </section>

      {/* 2. Sejarah Singkat */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border-4 border-card shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=900"
                alt="Gedung dan suasana belajar SDS Paradjai VI"
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <Badge variant="accent">Sejarah Kami</Badge>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Dedikasi Lebih Dari Satu Dekade Mencerdaskan Kehidupan Bangsa
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              SDS Paradjai VI didirikan berawal dari cita-cita para tokoh pendidik
              dan masyarakat di wilayah Jakarta Selatan untuk menghadirkan sekolah
              dasar yang tidak hanya unggul secara akademis, namun juga kokoh dalam
              pembentukan akidah dan adab anak.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Berangkat dari 2 ruang kelas pertama, kini SDS Paradjai VI telah
              berkembang menjadi sekolah dasar rujukan dengan akreditasi A (Unggul),
              dilengkapi sarana laboratorium komputer modern, perpustakaan digital,
              serta program tahfidz metode Ummi yang telah meluluskan ratusan penghafal
              Al-Qur'an cilik.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="bg-muted/30 py-16 border-y border-border/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="default">Arah Pandang</Badge>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Visi & Misi Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi Card */}
            <Card className="p-8 border-primary/30 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Visi Sekolah
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed italic">
                  "Terwujudnya Generasi Qur'ani yang Berakhlak Mulia, Cerdas,
                  Mandiri, Berwawasan Global, dan Peduli Lingkungan Hidup."
                </p>
              </div>
            </Card>

            {/* Misi Card */}
            <Card className="p-8 border-primary/30 shadow-md">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary-foreground">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Misi Sekolah
                </h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Menanamkan akidah yang lurus dan pembiasaan ibadah harian sesuai sunnah.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Menyelenggarakan bimbingan membaca dan menghafal Al-Qur'an yang menyenangkan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Menerapkan kurikulum merdeka dengan pendekatan student-centered learning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Mengasah keterampilan abad 21 melalui literasi digital dan robotik dasar.</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Nilai-Nilai Utama */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <Badge variant="default">Karakter Siswa</Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            4 Nilai Inti (Core Values)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-foreground">Amanah & Jujur</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mendidik anak agar memegang teguh kejujuran dalam tutur kata dan tindakan sehari-hari.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-foreground">Santun & Beradab</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Membiasakan senyum, sapa, salam, sopan, dan santun kepada orang tua, guru, serta teman.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-foreground">Gigih Berprestasi</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Menumbuhkan etos kerja pantang menyerah dan daya juang tinggi dalam menggapai cita-cita.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-foreground">Gotong Royong</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Membangun rasa empati sosial, kepedulian pada sesama, dan kemampuan berkolaborasi dalam tim.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
