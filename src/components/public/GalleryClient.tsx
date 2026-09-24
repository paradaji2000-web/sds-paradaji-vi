"use client";

import * as React from "react";
import { type Facility } from "@/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2, Eye, Sparkles } from "lucide-react";

export function GalleryClient({
  facilities,
}: {
  facilities: Facility[];
}) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Semua");
  const [activeFacility, setActiveFacility] = React.useState<Facility | null>(null);

  const categories = [
    "Semua",
    "Ruang Belajar",
    "Olahraga & Ibadah",
    "Penunjang",
  ];

  const filteredFacilities = facilities.filter(
    (item) => selectedCategory === "Semua" || item.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Facility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFacilities.map((fac) => (
          <Card
            key={fac.id}
            hoverable
            onClick={() => setActiveFacility(fac)}
            className="overflow-hidden cursor-pointer group flex flex-col justify-between border-border/80"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-muted flex justify-center items-center">
                {fac.imageUrl ? (
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">Tidak ada gambar</span>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-bold backdrop-blur-xs">
                    <Eye className="h-4 w-4" />
                    Lihat Foto Penuh
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="font-bold shadow-xs">
                    {fac.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-3">
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {fac.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {fac.description}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!activeFacility}
        onOpenChange={(open) => !open && setActiveFacility(null)}
      >
        {activeFacility && (
          <DialogContent
            className="max-w-3xl p-0 overflow-hidden"
            onClose={() => setActiveFacility(null)}
          >
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {activeFacility.imageUrl ? (
                <img
                  src={activeFacility.imageUrl}
                  alt={activeFacility.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground">Tidak ada gambar</span>
              )}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="font-bold">
                  {activeFacility.category}
                </Badge>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-heading text-xl font-bold text-foreground">
                {activeFacility.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeFacility.description}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
