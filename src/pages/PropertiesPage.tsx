import { useMemo, useState } from "react";
import {
  getPropertiesByRegion,
  regionLabels,
  type Region,
} from "@/data/properties";
import { PropertyCard } from "@/components/property-card";
import { cn } from "@/lib/utils";

export function PropertiesPage() {
  const [region, setRegion] = useState<Region | "all">("all");
  const list = useMemo(() => getPropertiesByRegion(region), [region]);

  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Vacation rentals
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">
        Properties
      </h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Waterfront homes and resort residences in Naples, Florida and Treasure
        Cay, Abaco—managed by Arnold Management Services, LLC.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", "naples", "bahamas"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-ring",
              region === r
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-bg-elevated text-fg-muted hover:bg-bg-subtle",
            )}
          >
            {regionLabels[r]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {list.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
