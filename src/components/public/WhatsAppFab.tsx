"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { schoolInfo } from "@/data/dummy";
import { generateWhatsAppLink } from "@/lib/utils";

export function WhatsAppFab() {
  const [isOpen, setIsOpen] = React.useState(false);

  const defaultMessage =
    "Halo Admin SDS Paradjai VI, saya ingin menanyakan informasi seputar pendaftaran siswa baru (PPDB).";
  const whatsappUrl = generateWhatsAppLink(schoolInfo.whatsapp, defaultMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip speech bubble */}
      {isOpen && (
        <div className="relative mb-1 w-64 rounded-2xl border border-border/80 bg-card p-4 shadow-xl text-left animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 text-xs text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-foreground">
              Panitia PPDB Online
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ada pertanyaan tentang syarat atau pendaftaran SDS Paradjai VI? Chat
            langsung dengan staf kami via WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#20bd5a] transition-colors"
          >
            Mulai Chat WhatsApp
          </a>
        </div>
      )}

      {/* FAB Button */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-md border border-border/80 backdrop-blur-xs">
          Butuh Bantuan?
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Tanya Panitia via WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600"></span>
          </span>
          <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
