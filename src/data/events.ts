import type { Region } from "@/data/properties";

export type LocalEvent = {
  id: string;
  title: string;
  region: Region;
  propertyIds?: string[];
  start: string;
  end?: string;
  venue: string;
  category: "festival" | "arts" | "outdoors" | "food" | "community";
  description: string;
};

export const localEvents: LocalEvent[] = [
  {
    id: "naples-swamp-buggy",
    title: "Swamp Buggy Races",
    region: "naples",
    start: "2026-10-24",
    end: "2026-10-26",
    venue: "Florida Sports Park, Naples",
    category: "outdoors",
    description:
      "Southwest Florida’s iconic mud-racing tradition draws fans from across the region each fall.",
  },
  {
    id: "naples-film-festival",
    title: "Naples International Film Festival",
    region: "naples",
    start: "2026-10-15",
    end: "2026-10-19",
    venue: "Artis—Naples",
    category: "arts",
    description:
      "Independent and international cinema screenings, filmmaker talks, and red-carpet premieres.",
  },
  {
    id: "fifth-ave-art",
    title: "Fifth Avenue South Art Walk",
    region: "naples",
    start: "2026-09-05",
    venue: "Fifth Avenue South, Naples",
    category: "arts",
    description:
      "Evening gallery openings, street art, and local artists across downtown Naples.",
  },
  {
    id: "stone-crab-season",
    title: "Stone Crab Season Opening",
    region: "naples",
    start: "2026-10-15",
    venue: "Naples waterfront restaurants",
    category: "food",
    description:
      "Florida’s celebrated stone crab season opens mid-October—pair with Gulf sunsets.",
  },
  {
    id: "tc-regatta",
    title: "Treasure Cay Sailing Regatta",
    region: "bahamas",
    start: "2026-11-14",
    end: "2026-11-16",
    venue: "Treasure Cay Marina",
    category: "outdoors",
    description:
      "Local and visiting sailors race Abaco’s turquoise waters in a festive weekend regatta.",
  },
  {
    id: "abaco-junkanoo",
    title: "Abaco Junkanoo Celebration",
    region: "bahamas",
    start: "2026-12-26",
    venue: "Treasure Cay & Marsh Harbour",
    category: "festival",
    description:
      "Costumes, goatskin drums, and parade energy mark Bahamas Christmas tradition across Abaco.",
  },
  {
    id: "tc-beach-cleanup",
    title: "Treasure Cay Beach Cleanup",
    region: "bahamas",
    start: "2026-09-20",
    venue: "Treasure Cay Beach",
    category: "community",
    description:
      "Community volunteers protect one of the Caribbean’s most beautiful stretches of sand.",
  },
  {
    id: "naples-new-years",
    title: "Naples New Year’s Eve on the Avenue",
    region: "naples",
    start: "2026-12-31",
    venue: "Fifth Avenue South",
    category: "festival",
    description:
      "Live music, dining specials, and midnight celebrations in the heart of Old Naples.",
  },
];

export function getEvents(options: {
  region?: Region | "all";
  propertyId?: string;
  from?: string;
}): LocalEvent[] {
  const from = options.from ?? "1970-01-01";
  return localEvents
    .filter((e) => {
      if (options.region && options.region !== "all" && e.region !== options.region)
        return false;
      if (
        options.propertyId &&
        e.propertyIds &&
        !e.propertyIds.includes(options.propertyId)
      )
        return false;
      const end = e.end ?? e.start;
      return end >= from;
    })
    .sort((a, b) => a.start.localeCompare(b.start));
}
