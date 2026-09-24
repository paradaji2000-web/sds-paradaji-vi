import { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { schoolInfo } from "@/data/dummy";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Informasi kontak resmi, nomor WhatsApp panitia PPDB, jam layanan, dan alamat sekolah SDS Paradjai VI.",
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="default">Sekretariat & Pelayanan</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
          Hubungi SDS Paradjai VI
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Kami siap melayani dan menjawab setiap pertanyaan Bapak/Ibu calon orang
          tua murid mengenai kurikulum, fasilitas, dan pendaftaran murid baru.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Information & Map */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-6 space-y-6 border-border/80 shadow-md">
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Informasi Kontak Resmi
              </h3>
              <p className="text-xs text-muted-foreground">
                Silakan datang langsung ke kantor sekretariat atau hubungi kanal resmi kami.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Alamat Sekolah</div>
                  <div className="text-muted-foreground leading-relaxed mt-0.5">
                    {schoolInfo.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Telepon & WhatsApp</div>
                  <div className="text-muted-foreground mt-0.5">
                    WhatsApp: <strong>+{schoolInfo.whatsapp}</strong>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Telepon Kantor: {schoolInfo.landline}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Surat Elektronik (Email)</div>
                  <div className="text-muted-foreground mt-0.5">
                    {schoolInfo.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Jam Pelayanan Kantor</div>
                  <div className="text-muted-foreground mt-0.5">
                    {schoolInfo.operationalHours}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Map Frame Card */}
          <Card className="overflow-hidden border-border/80 shadow-md">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                Denah Lokasi Sekolah
              </span>
            </div>
            <div className="relative aspect-video w-full bg-muted flex items-center justify-center text-center p-6">
              <div className="space-y-2">
                <MapPin className="mx-auto h-8 w-8 text-primary animate-bounce" />
                <p className="font-bold text-sm text-foreground">
                  SDS Paradjai VI - Cilandak, Jakarta Selatan
                </p>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Dekat Stasiun MRT Fatmawati & Cilandak Town Square, akses sangat mudah dan bebas macet.
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(schoolInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 hover:bg-primary hover:text-white transition-colors mt-2"
                >
                  Buka di Google Maps ↗
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: WhatsApp Contact Form */}
        <div className="lg:col-span-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
