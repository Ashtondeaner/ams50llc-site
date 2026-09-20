import { ArrowRight, MapPin } from "lucide-react";
import { properties, site } from "@/data/properties";
import { PropertyCard } from "@/components/property-card";
import { ButtonLink } from "@/components/ui/button";

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-bg-ink text-fg-on-ink">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {site.domain}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
              Vacation rentals in Naples &amp; the Bahamas
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-on-ink-muted text-pretty">
              {site.legalName} manages four distinctive waterfront properties—
              resort living on Naples Bay, canal homes with no-bridges Gulf
              access, and beachfront luxury in Treasure Cay, Abaco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/properties" size="lg" variant="default">
                Browse properties
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink to="/book" size="lg" variant="secondary">
                Check availability
              </ButtonLink>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-fg-on-ink-muted">
              <MapPin className="size-4 text-accent" />
              {site.headquarters.full}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {site.locations.map((loc) => (
              <div
                key={loc}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Destination
                </p>
                <p className="mt-2 font-display text-xl">{loc}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Direct booking
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-on-ink-muted">
                Live calendar, transparent nightly rates, and confirmation
                through {site.legalName}. Questions:{" "}
                <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Our collection
            </p>
            <h2 className="mt-2 font-display text-3xl text-fg md:text-4xl">
              Four homes. Two destinations.
            </h2>
          </div>
          <ButtonLink to="/properties" variant="outline">
            View all
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
