import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  variant = "outline",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "outline" | "accent" | "solid";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "outline" &&
          "border border-border bg-bg-elevated text-fg-muted",
        variant === "accent" && "bg-accent/20 text-fg",
        variant === "solid" && "bg-primary text-primary-fg",
        className,
      )}
      {...props}
    />
  );
}
