"use client";

import * as React from "react";
import { Menu, Shield } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { AdminSidebar } from "./AdminSidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, isLoaded } = useUser();

  const role = user?.publicMetadata?.role as string || "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden rounded-lg border border-border p-2 text-foreground hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Buka Navigasi Admin</span>
        </button>
        <div>
          <h1 className="font-heading text-base sm:text-lg font-bold text-foreground">
            Panel Administrator
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Sistem Informasi & Manajemen PPDB Online SDS Paradjai VI
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isLoaded && user && (
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Shield className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Role:</span> {role}
          </div>
        )}

        <div className="flex h-9 w-9 items-center justify-center rounded-full">
          <UserButton />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} side="left">
        <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
      </Sheet>
    </header>
  );
}
