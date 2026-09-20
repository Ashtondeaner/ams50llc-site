import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/properties";
import { cn } from "@/lib/utils";

const links = [
  { to: "/properties", label: "Properties" },
  { to: "/destinations", label: "Destinations" },
  { to: "/events", label: "Events" },
  { to: "/book", label: "Book" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-md">
          <span className="flex size-9 items-center justify-center rounded-md bg-bg-ink font-display text-sm font-semibold tracking-wide text-fg-on-ink">
            AMS
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-lg leading-tight text-fg">
              {site.name}
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">
              {site.domain}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-ring",
                  isActive
                    ? "bg-bg-subtle text-fg"
                    : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border md:hidden focus-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-bg-elevated md:hidden">
          <div className="container-page flex flex-col py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-3 text-sm font-medium",
                    isActive ? "bg-bg-subtle text-fg" : "text-fg-muted",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
