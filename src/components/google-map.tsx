import { ExternalLink, Navigation } from "lucide-react";
import {
  googleMapsDirectionsUrl,
  googleMapsEmbedUrl,
  googleMapsSearchUrl,
  type MapLocation,
} from "@/lib/maps";
import { cn } from "@/lib/utils";

export function GoogleMap({
  location,
  className,
}: {
  location: MapLocation;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="relative aspect-video w-full bg-bg-subtle">
        <iframe
          title={`Map: ${location.label}`}
          src={googleMapsEmbedUrl(location)}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="text-sm font-medium text-fg">{location.label}</p>
        <div className="flex gap-3 text-sm">
          <a
            href={googleMapsSearchUrl(location.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink className="size-3.5" />
            Open
          </a>
          <a
            href={googleMapsDirectionsUrl(location.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-fg-muted hover:text-primary"
          >
            <Navigation className="size-3.5" />
            Directions
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
