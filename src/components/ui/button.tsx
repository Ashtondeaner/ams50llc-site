import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

const variants = {
  default: "bg-primary text-primary-fg hover:bg-primary-hover",
  secondary:
    "bg-bg-elevated text-fg border border-border hover:bg-bg-subtle",
  outline:
    "border border-border-strong bg-transparent text-fg hover:bg-bg-subtle",
  ghost: "text-fg hover:bg-bg-subtle",
  ink: "bg-bg-ink text-fg-on-ink hover:opacity-90",
} as const;

const sizes = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3 text-xs",
  lg: "h-12 px-7 text-base",
  icon: "h-11 w-11",
} as const;

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children?: ReactNode;
};

export function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: Common & LinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-ring",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
