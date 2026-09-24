import { Metadata } from "next";
import { Clock, User, Trophy, Sparkles } from "lucide-react";
import { getExtracurriculars } from "@/server/actions/extracurriculars";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Ekstrakurikuler",
  description:
    "Program kegiatan ekstrakurikuler SDS Paradjai VI untuk mengasah minat, bakat, kebugaran, dan karakter kepemimpinan siswa.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EkstrakurikulerPage() {
  const extracurricularList = await getExtracurriculars();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="default">Pengembangan Diri</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
          Program Ekstrakurikuler
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Salurkan bakat dan potensi terbaik ananda di luar jam kelas melalui
          berbagai pilihan kegiatan keagamaan, sains teknologi, seni budaya, dan olahraga.
        </p>
      </div>

      {/* Grid Ekskul */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {extracurricularList.map((ekskul) => (
          <Card
            key={ekskul.id}
            hoverable
            className="overflow-hidden flex flex-col justify-between border-border/80"
          >
            <div>
              {/* Ekskul Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted flex justify-center items-center">
                {ekskul.imageUrl ? (
                  <img
                    src={ekskul.imageUrl}
                    alt={ekskul.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">Tidak ada gambar</span>
                )}
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="font-bold shadow-xs">
                    Unggulan
                  </Badge>
                </div>
              </div>

              {/* Information */}
              <CardContent className="p-6 space-y-4">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {ekskul.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ekskul.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-border/70 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>{ekskul.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary shrink-0" />
                    <span>Pembina: <strong>{ekskul.coach}</strong></span>
                  </div>
                </div>

              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
