import { Link, useParams } from "react-router-dom";
import { PropertyCard } from "@/components/property-card";
import { getDestinationBySlug } from "@/data/local-seo";
import { getPropertiesByRegion } from "@/data/properties";
import { ButtonLink } from "@/components/ui/button";

export function DestinationDetailPage() {
  const { slug } = useParams();
  const dest = slug ? getDestinationBySlug(slug) : undefined;

  if (!dest) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl">Destination not found</h1>
        <ButtonLink to="/destinations" className="mt-6">
          All destinations
        </ButtonLink>
      </div>
    );
  }

  const list = getPropertiesByRegion(dest.region);

  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Destination
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">
        {dest.name}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{dest.headline}</p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg-muted">
        {dest.description}
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {list.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
      <p className="mt-8 text-sm text-fg-subtle">
        <Link to="/destinations" className="text-primary hover:underline">
          ← All destinations
        </Link>
      </p>
    </div>
  );
}
