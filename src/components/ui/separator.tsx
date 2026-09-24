import * as React from "react";
import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
}

export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/80 bg-muted items-center justify-center font-bold text-primary text-sm",
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="aspect-square h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
