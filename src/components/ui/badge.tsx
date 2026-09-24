import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "accent"
    | "outline"
    | "pending"
    | "verified"
    | "accepted"
    | "rejected";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    accent: "border-transparent bg-sky-100 text-sky-800 border-sky-200",
    outline: "text-foreground border-border",
    pending: "border-amber-200 bg-amber-100 text-amber-800",
    verified: "border-sky-200 bg-sky-100 text-sky-800",
    accepted: "border-emerald-200 bg-emerald-100 text-emerald-800",
    rejected: "border-rose-200 bg-rose-100 text-rose-800",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
