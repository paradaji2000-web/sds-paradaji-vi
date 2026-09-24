"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, GraduationCap, PhoneCall, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { schoolInfo } from "@/data/dummy";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang" },
  { name: "Berita", href: "/berita" },
  { name: "Guru & Staf", href: "/guru" },
  { name: "Ekstrakurikuler", href: "/ekstrakurikuler" },
  { name: "Fasilitas", href: "/galeri" },
  { name: "Kontak", href: "/kontak" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all">
      {/* Top Banner Info Bar */}
      <div className="bg-primary px-4 py-1.5 text-xs text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="font-semibold">NPSN: {schoolInfo.npsn}</span>
            <span className="hidden md:inline">• Akreditasi {schoolInfo.accreditation}</span>
            <span className="hidden lg:inline">• {schoolInfo.operationalHours}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/ppdb/status"
              className="text-[11px] sm:text-xs font-semibold hover:underline flex items-center gap-1"
            >
              Cek Status PPDB
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-foreground leading-none">
              SDS PARADAJI VI
            </span>
            <span className="text-[11px] font-medium text-muted-foreground mt-0.5">
              Jakarta Selatan • Berakhlak & Berprestasi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link href="/ppdb">
            <Button
              variant="secondary"
              className="font-bold shadow-md hover:shadow-lg transition-all"
            >
              PPDB 2025/2026
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/ppdb" className="sm:hidden">
            <Button size="sm" variant="secondary" className="text-xs font-bold px-3">
              PPDB
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka Menu"
            className="rounded-xl border border-border/80 p-2 text-foreground hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} side="right">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-foreground">
                  SDS PARADAJI VI
                </span>
                <span className="text-xs text-muted-foreground">
                  Menu Utama
                </span>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <Link
              href="/ppdb/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="secondary" className="w-full font-bold justify-center">
                Daftar PPDB Online
              </Button>
            </Link>
            <Link
              href="/ppdb/status"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="outline" className="w-full justify-center">
                Cek Status Pendaftaran
              </Button>
            </Link>
            <div className="pt-2 text-center text-xs text-muted-foreground">
              Hotline: {schoolInfo.phone}
            </div>
          </div>
        </div>
      </Sheet>
    </header>
  );
}
