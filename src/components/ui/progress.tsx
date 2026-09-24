import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({
  value = 0,
  className,
}: {
  value?: number;
  className?: string;
}) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-muted border border-border/40",
        className
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
