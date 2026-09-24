import { Metadata } from "next";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { getTeachers } from "@/server/actions/teachers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Profil Guru & Tenaga Pendidik",
  description:
    "Mengenal dewan guru dan staf pengajar berdedikasi di SDS Paradjai VI.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GuruPage() {
  const teachersList = await getTeachers();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="default">Tenaga Pendidik</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
          Dewan Guru & Staf Pengajar
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Pendidik berintegritas dan berakhlak mulia yang membimbing putra-putri
          Anda dengan penuh kesabaran, kasih sayang, dan keahlian pedagogis modern.
        </p>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teachersList.map((teacher) => (
          <Card
            key={teacher.id}
            hoverable
            className="overflow-hidden border-border/80 flex flex-col justify-between"
          >
            <div>
              {/* Teacher Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                {teacher.photoUrl ? (
                  <img
                    src={teacher.photoUrl}
                    alt={teacher.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <span className="text-muted-foreground">Tanpa Foto</span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge
                    variant="secondary"
                    className="font-bold text-[11px] shadow-sm backdrop-blur-xs truncate max-w-full"
                  >
                    {teacher.position}
                  </Badge>
                </div>
              </div>

              {/* Information */}
              <CardContent className="p-5 space-y-2.5">
                <h3 className="font-heading text-base font-bold text-foreground leading-snug">
                  {teacher.name}
                </h3>
                <p className="text-xs font-semibold text-primary">
                  {teacher.subject}
                </p>
                <div className="pt-2 border-t border-border/60 text-xs text-muted-foreground space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="leading-tight">{teacher.education}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed pt-1">
                  "{teacher.bio}"
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
