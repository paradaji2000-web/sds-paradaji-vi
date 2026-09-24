import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { NewsFilterList } from "@/components/public/NewsFilterList";
import { getNews } from "@/server/actions/news";

export const metadata: Metadata = {
  title: "Berita & Informasi Terkini",
  description:
    "Kumpulan berita, kegiatan sekolah, dan pengumuman resmi SDS Paradjai VI.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BeritaPage() {
  const newsList = await getNews(1, 100); // Fetch up to 100 recent news for now

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="default">Pusat Informasi</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
          Kabar & Berita SDS Paradjai VI
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Temukan dokumentasi kegiatan belajar mengajar, pencapaian prestasi siswa,
          dan informasi terkini seputar kalender akademik sekolah.
        </p>
      </div>

      <NewsFilterList initialNews={newsList} />
    </div>
  );
}
