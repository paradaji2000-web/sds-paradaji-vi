import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { facilitiesList } from "@/data/dummy";
import { GalleryClient } from "@/components/public/GalleryClient";
import { getFacilities } from "@/server/actions/facilities";
import { Facility } from "@/db/schema";

export const metadata: Metadata = {
  title: "Galeri & Fasilitas Sekolah",
  description:
    "Jelajahi sarana dan prasarana belajar mengajar modern yang ramah anak di SDS Paradjai VI.",
};

export const revalidate = 60;

export default async function GaleriPage() {
  let facilities: Facility[] = [];

  try {
    const dbFacilities = await getFacilities();
    if (dbFacilities && dbFacilities.length > 0) {
      facilities = dbFacilities;
    }
  } catch (error) {
    console.error("Failed to fetch facilities from db:", error);
  }

  if (facilities.length === 0) {
    facilities = facilitiesList.map((f, i) => ({
      id: f.id,
      name: f.name,
      slug: f.id,
      category: f.category || "Penunjang",
      description: f.description || "",
      imageUrl: f.imageUrl || null,
      displayOrder: i,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="default">Sarana & Prasarana</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
          Fasilitas Belajar & Ibadah
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Kami menyediakan lingkungan belajar yang asri, aman, berpendingin udara (AC),
          dan berteknologi maju guna mendukung perkembangan potensi optimal ananda.
        </p>
      </div>

      <GalleryClient facilities={facilities} />
    </div>
  );
}
