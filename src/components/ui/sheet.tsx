"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Sheet({
  open,
  onOpenChange,
  children,
  side = "right",
}: SheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      {/* Sheet Content Panel */}
      <div
        className={cn(
          "relative z-50 flex h-full w-full max-w-xs flex-col bg-background p-6 shadow-2xl transition ease-in-out duration-300",
          side === "right" ? "ml-auto animate-in slide-in-from-right" : "mr-auto animate-in slide-in-from-left"
        )}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Tutup Menu</span>
        </button>
        {children}
      </div>
    </div>
  );
}
