"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Newspaper,
  School,
  Sparkles,
  Image as ImageIcon,
  BellRing,
  Settings,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Pendaftar PPDB", href: "/admin/ppdb", icon: Users },
  { name: "Kabar Berita", href: "/admin/berita", icon: Newspaper },
  { name: "Dewan Guru", href: "/admin/guru", icon: GraduationCap },
  { name: "Fasilitas Sekolah", href: "/admin/fasilitas", icon: School },
  { name: "Ekstrakurikuler", href: "/admin/ekstrakurikuler", icon: Sparkles },
  { name: "Galeri Foto", href: "/admin/galeri", icon: ImageIcon },
  { name: "Log Notifikasi", href: "/admin/notifikasi", icon: BellRing },
  { name: "Pengaturan Sistem", href: "/admin/pengaturan", icon: Settings },
];

export function AdminSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between bg-card border-r border-border p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <School className="h-5 w-5" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-foreground leading-tight">
              SDS PARADAJI VI
            </div>
            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              Portal Administrator
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link to public website */}
      <div className="space-y-2 border-t border-border pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <span>Lihat Website Publik</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
        </Link>
        <div className="flex items-center justify-between rounded-xl bg-muted/60 p-2.5 text-xs">
          <div className="flex flex-col">
            <span className="font-bold text-foreground">Admin Sekolah</span>
            <span className="text-[10px] text-muted-foreground">admin@sdsparadjai6.sch.id</span>
          </div>
          <Link
            href="/"
            title="Keluar ke Beranda"
            className="text-muted-foreground hover:text-destructive p-1"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
