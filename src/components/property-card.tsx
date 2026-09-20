import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Users } from "lucide-react";
import type { Property } from "@/data/properties";
import { getPricing } from "@/data/pricing";
import { formatMoney } from "@/lib/booking-engine";
import { PropertyCardGallery } from "@/components/property-gallery";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PropertyCard({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const pricing = getPricing(property.id);
  const images =
    property.gallery.length > 0 ? property.gallery : [property.heroImage];

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-bg-subtle">
        <PropertyCardGallery
          images={images}
          alt={property.name}
          propertySlug={property.slug}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/3 bg-gradient-to-t from-bg-ink/45 to-transparent" />
        <Badge className="pointer-events-none absolute left-3 top-3 z-[4] border-0 bg-bg-elevated/95 shadow-sm backdrop-blur-sm">
          {property.propertyType}
        </Badge>
        {pricing ? (
          <span className="pointer-events-none absolute bottom-3 right-3 z-[4] rounded-md bg-bg-ink/85 px-2.5 py-1 text-right text-xs font-medium text-fg-on-ink backdrop-blur-sm">
            {formatMoney(pricing.nightlyRate)}/night
            <span className="block font-normal text-fg-on-ink-muted">
              {pricing.rateSuffix}
            </span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-subtle">
          {property.city},{" "}
          {property.country === "Florida, USA" ? "Florida" : property.country}
        </p>
        <h3 className="mt-1 font-display text-xl tracking-tight text-fg">
          <Link
            to={`/properties/${property.slug}`}
            className="rounded-sm hover:text-primary focus-ring"
          >
            {property.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-fg-muted">
          <MapPin className="size-3.5 shrink-0" />
          {property.location}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-muted">
          {property.tagline}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-xs font-medium text-fg-muted">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="size-3.5" />
            {property.bedrooms} bed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="size-3.5" />
            {property.bathrooms} bath
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" />
            Sleeps {property.sleeps}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <Link
            to={`/properties/${property.slug}`}
            className="text-sm font-medium text-primary hover:text-primary-hover focus-ring rounded-sm"
          >
            View details
          </Link>
          <Link
            to={`/book?property=${property.slug}`}
            className="text-sm font-medium text-fg hover:text-primary focus-ring rounded-sm"
          >
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}
