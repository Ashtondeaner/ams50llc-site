import { Link } from "react-router-dom";
import { site, teamNamesList } from "@/data/properties";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-ink text-fg-on-ink">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{site.legalName}</p>
          <p className="mt-2 text-sm text-fg-on-ink-muted">{site.tagline}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-fg-on-ink-muted">
            {site.domain}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Headquarters
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fg-on-ink-muted">
            {site.headquarters.line1}
            <br />
            {site.headquarters.line2}
          </p>
          <p className="mt-3 text-sm">
            <a href={`tel:${site.phoneTel}`} className="hover:text-accent">
              {site.phone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Partners
          </p>
          <ul className="mt-2 space-y-1 text-sm text-fg-on-ink-muted">
            {site.principals.map((p) => (
              <li key={p.name}>
                {p.name}
                <span className="text-fg-on-ink-muted/70"> · {p.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link to="/properties" className="hover:text-accent">
              Properties
            </Link>
            <Link to="/book" className="hover:text-accent">
              Book
            </Link>
            <Link to="/contact" className="hover:text-accent">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-fg-on-ink-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Managed by {teamNamesList()}.</p>
        </div>
      </div>
    </footer>
  );
}
