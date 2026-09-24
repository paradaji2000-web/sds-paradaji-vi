import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "whatsapp"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
      default:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:shadow-md",
      outline:
        "border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5 hover:border-primary/40",
      ghost:
        "hover:bg-muted text-foreground hover:text-foreground",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      whatsapp:
        "bg-[#25D366] text-white shadow-sm hover:bg-[#20bd5a] hover:shadow-md",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5",
      sm: "h-9 rounded-full px-4 text-xs",
      lg: "h-12 rounded-full px-8 text-base",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
