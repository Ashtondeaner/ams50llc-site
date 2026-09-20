import { useMemo, useState } from "react";
import { getEvents } from "@/data/events";
import { regionLabels, type Region } from "@/data/properties";
import { cn } from "@/lib/utils";

export function EventsPage() {
  const [region, setRegion] = useState<Region | "all">("all");
  const events = useMemo(
    () => getEvents({ region, from: new Date().toISOString().slice(0, 10) }),
    [region],
  );

  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Local calendar
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">Events</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Curated festivals, arts, and outdoor happenings near our Naples and
        Treasure Cay properties.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", "naples", "bahamas"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium focus-ring",
              region === r
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-bg-elevated text-fg-muted hover:bg-bg-subtle",
            )}
          >
            {regionLabels[r]}
          </button>
        ))}
      </div>

      <ul className="mt-10 space-y-4">
        {events.map((e) => (
          <li
            key={e.id}
            className="rounded-2xl border border-border bg-bg-elevated p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {e.start}
                  {e.end ? ` – ${e.end}` : ""} · {e.category}
                </p>
                <h2 className="mt-1 font-display text-xl text-fg">{e.title}</h2>
                <p className="mt-1 text-sm text-fg-muted">{e.venue}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {e.description}
                </p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-fg-subtle">
                {regionLabels[e.region]}
              </span>
            </div>
          </li>
        ))}
        {events.length === 0 ? (
          <li className="text-sm text-fg-muted">No upcoming events listed.</li>
        ) : null}
      </ul>
    </div>
  );
}
