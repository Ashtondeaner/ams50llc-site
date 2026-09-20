import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  MapPin,
  Ruler,
  Users,
} from "lucide-react";
import { BookingWidget } from "@/components/booking/booking-widget";
import { GoogleMap } from "@/components/google-map";
import { PropertyGallery } from "@/components/property-gallery";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getNearbyPoisForProperty } from "@/data/points-of-interest";
import { getPricing } from "@/data/pricing";
import { destinations } from "@/data/local-seo";
import { getEvents } from "@/data/events";
import {
  descriptionParagraphs,
  getPropertyBySlug,
  properties,
  site,
  teamNamesList,
} from "@/data/properties";
import { formatMoney } from "@/lib/booking-engine";
import { googleMapsSearchUrl } from "@/lib/maps";

export function PropertyDetailPage() {
  const { slug } = useParams();
  const property = slug ? getPropertyBySlug(slug) : undefined;

  if (!property) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl text-fg">Property not found</h1>
        <ButtonLink to="/properties" className="mt-6">
          Back to properties
        </ButtonLink>
      </div>
    );
  }

  const pricing = getPricing(property.id);
  const paragraphs = descriptionParagraphs(property.description);
  const dest = destinations.find((d) => d.region === property.region);
  const pois = getNearbyPoisForProperty(property.id);
  const events = getEvents({ region: property.region }).slice(0, 4);
  const others = properties.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="pb-16 md:pb-24">
      <div className="border-b border-border bg-bg-elevated">
        <div className="container-page py-6">
          <ButtonLink
            to="/properties"
            variant="ghost"
            size="sm"
            className="-ml-2 text-fg-muted"
          >
            <ArrowLeft className="size-4" />
            All properties
          </ButtonLink>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{property.propertyType}</Badge>
                <Badge>
                  {property.region === "bahamas"
                    ? "Treasure Cay, Bahamas"
                    : "Naples, Florida"}
                </Badge>
                {pricing ? (
                  <Badge>
                    {formatMoney(pricing.nightlyRate)}/night{" "}
                    {pricing.rateSuffix}
                  </Badge>
                ) : null}
              </div>
              <h1 className="mt-3 font-display text-3xl tracking-tight text-fg md:text-5xl">
                {property.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-fg-muted">
                <MapPin className="size-4 shrink-0" />
                {property.location} · {property.city}, {property.country}
              </p>
              <p className="mt-3 text-sm font-medium text-fg">
                {property.bedrooms} BR · {property.bathrooms} BA · Sleeps{" "}
                {property.sleeps}
                {property.sqft
                  ? ` · ${property.sqft.toLocaleString()} sq ft`
                  : ""}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted">
                {property.tagline}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="#book"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-7 text-base font-medium text-primary-fg hover:bg-primary-hover focus-ring"
              >
                Check availability
              </a>
              <a
                href="#location-map"
                className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-bg-elevated px-7 text-base font-medium text-fg hover:bg-bg-subtle focus-ring"
              >
                View map
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pt-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PropertyGallery
              images={property.gallery}
              alt={`${property.name} vacation rental in ${property.city}`}
            />

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Property description
              </p>
              <h2 className="mt-2 font-display text-2xl text-fg">
                About {property.name}
              </h2>
              <div className="mt-5 space-y-4">
                {paragraphs.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="text-base leading-[1.7] text-fg-muted"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: BedDouble, label: "Bedrooms", value: String(property.bedrooms) },
                  { icon: Bath, label: "Bathrooms", value: String(property.bathrooms) },
                  { icon: Users, label: "Sleeps", value: String(property.sleeps) },
                  {
                    icon: Ruler,
                    label: "Size",
                    value: property.sqft
                      ? `${property.sqft.toLocaleString()} sq ft`
                      : "—",
                  },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-border bg-bg-elevated p-4"
                  >
                    <spec.icon className="size-5 text-primary" />
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">
                      {spec.label}
                    </p>
                    <p className="mt-0.5 text-lg font-semibold text-fg">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-display text-xl text-fg">Highlights</h3>
                <ul className="mt-4 space-y-2">
                  {property.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-fg-muted"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-xl text-fg">Amenities</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2.5 text-sm text-fg-muted"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="location-map" className="mt-12 scroll-mt-24">
              <h3 className="font-display text-xl text-fg">Location</h3>
              <p className="mt-2 text-sm text-fg-muted">
                {property.location} · {property.city}, {property.country}
              </p>
              <div className="mt-4">
                <GoogleMap
                  location={{
                    label: property.name,
                    latitude: property.map.latitude,
                    longitude: property.map.longitude,
                    query: property.map.query,
                    zoom: property.map.zoom,
                  }}
                />
              </div>
            </div>

            {pois.length > 0 ? (
              <section className="mt-12">
                <h3 className="font-display text-xl text-fg">
                  Nearby points of interest
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {pois.map((poi) => (
                    <li key={poi.id}>
                      <a
                        href={googleMapsSearchUrl(poi.mapQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-border bg-bg-elevated p-4 transition-colors hover:bg-bg-subtle focus-ring"
                      >
                        <p className="font-medium text-fg">{poi.name}</p>
                        <p className="mt-1 text-xs text-fg-subtle">
                          {poi.distance} · {poi.category}
                        </p>
                        <p className="mt-2 text-sm text-fg-muted">
                          {poi.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {events.length > 0 ? (
              <section className="mt-12">
                <h3 className="font-display text-xl text-fg">
                  Upcoming local events
                </h3>
                <ul className="mt-4 space-y-3">
                  {events.map((e) => (
                    <li
                      key={e.id}
                      className="rounded-xl border border-border bg-bg-elevated p-4"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-primary">
                        {e.start}
                        {e.end ? ` – ${e.end}` : ""}
                      </p>
                      <p className="mt-1 font-medium text-fg">{e.title}</p>
                      <p className="text-sm text-fg-muted">{e.venue}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/events"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Full events calendar
                </Link>
              </section>
            ) : null}
          </div>

          <aside className="lg:col-span-4">
            <div id="book" className="sticky top-24 space-y-4 scroll-mt-24">
              <BookingWidget property={property} />
              <div className="rounded-2xl border border-border bg-bg-elevated p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Hosted by
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  {teamNamesList()} · {site.legalName}
                </p>
                <p className="mt-3 text-sm text-fg-muted">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
                <p className="mt-1 text-sm">
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="font-medium text-fg hover:text-primary"
                  >
                    {site.phone}
                  </a>
                </p>
                {dest ? (
                  <p className="mt-3 text-xs text-fg-subtle">
                    Part of our{" "}
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="text-primary hover:underline"
                    >
                      {dest.name}
                    </Link>{" "}
                    collection
                  </p>
                ) : null}
              </div>
            </div>
          </aside>
        </div>

        {others.length > 0 ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-2xl text-fg">More properties</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.id}
                  to={`/properties/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-4/3 bg-bg-subtle">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="absolute inset-0 size-full object-cover opacity-90 transition-transform group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-fg-subtle">
                      {p.city}
                    </p>
                    <p className="mt-1 font-display text-lg text-fg group-hover:text-primary">
                      {p.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
