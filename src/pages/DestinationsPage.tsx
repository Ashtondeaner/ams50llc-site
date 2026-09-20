import { Link } from "react-router-dom";
import { destinations } from "@/data/local-seo";
import { getPropertiesByRegion } from "@/data/properties";

export function DestinationsPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Where we host
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">
        Destinations
      </h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {destinations.map((d) => {
          const props = getPropertiesByRegion(d.region);
          return (
            <Link
              key={d.slug}
              to={`/destinations/${d.slug}`}
              className="rounded-2xl border border-border bg-bg-elevated p-6 transition-shadow hover:shadow-[var(--shadow-lift)] focus-ring"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {d.shortName}
              </p>
              <h2 className="mt-2 font-display text-2xl text-fg">{d.name}</h2>
              <p className="mt-2 text-sm text-fg-muted">{d.headline}</p>
              <p className="mt-4 text-xs text-fg-subtle">
                {props.length} propert{props.length === 1 ? "y" : "ies"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
