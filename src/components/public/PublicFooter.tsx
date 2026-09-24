import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { schoolInfo } from "@/data/dummy";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      {/* Top Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
                SDS PARADAJI VI
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {schoolInfo.tagline}. Berkomitmen melahirkan tunas bangsa yang
              unggul dalam sains, cerdas berteknologi, dan kokoh dalam hafalan
              Al-Qur’an serta budi pekerti.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Terakreditasi {schoolInfo.accreditation} (NPSN: {schoolInfo.npsn})</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Jelajahi Sekolah
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tentang"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Profil & Visi Misi
                </Link>
              </li>
              <li>
                <Link
                  href="/guru"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dewan Guru & Tenaga Didik
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kabar Berita & Kegiatan
                </Link>
              </li>
              <li>
                <Link
                  href="/ekstrakurikuler"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Program Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Fasilitas & Sarana Belajar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: PPDB Online Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Pendaftaran (PPDB)
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/ppdb"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Informasi Alur & Syarat PPDB
                </Link>
              </li>
              <li>
                <Link
                  href="/ppdb/daftar"
                  className="text-secondary-foreground font-bold hover:underline"
                >
                  Formulir Pendaftaran Online
                </Link>
              </li>
              <li>
                <Link
                  href="/ppdb/status"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Lacak Status Verifikasi Berkas
                </Link>
              </li>
              <li>
                <Link
                  href="/syarat-ketentuan"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Ketentuan Calon Murid
                </Link>
              </li>
              <li>
                <Link
                  href="/kebijakan-privasi"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kebijakan Privasi Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Sekretariat & Kontak
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>{schoolInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>{schoolInfo.phone} / {schoolInfo.landline}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>{schoolInfo.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>{schoolInfo.operationalHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Admin Gateway */}
      <div className="border-t border-border/80 bg-muted/40 py-4 px-4 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong>{schoolInfo.name}</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/kebijakan-privasi"
              className="hover:underline hover:text-foreground"
            >
              Kebijakan Privasi
            </Link>
            <span>•</span>
            <Link
              href="/syarat-ketentuan"
              className="hover:underline hover:text-foreground"
            >
              Syarat & Ketentuan
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Portal Admin
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
