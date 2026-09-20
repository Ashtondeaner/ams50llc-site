import type { Region } from "@/data/properties";
import { site } from "@/data/properties";

export type Destination = {
  slug: string;
  region: Region;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  localKeywords: string[];
};

export const destinations: Destination[] = [
  {
    slug: "naples-florida",
    region: "naples",
    name: "Naples, Florida",
    shortName: "Naples",
    headline: "Gulf-front living, no-bridges boating, and resort ease",
    description:
      "Discover Arnold Management Services vacation rentals in Naples and Isles of Capri—waterfront homes with private docks, resort residences at Naples Bay, and direct access to the Gulf and 10,000 Islands.",
    localKeywords: [
      "Naples Florida vacation rental",
      "Isles of Capri boat dock rental",
      "Naples Bay Resort vacation home",
      "10,000 Islands vacation rental",
      "no bridges Gulf access Naples",
      "Southwest Florida short term rental",
    ],
  },
  {
    slug: "treasure-cay-bahamas",
    region: "bahamas",
    name: "Treasure Cay, Abaco, Bahamas",
    shortName: "Treasure Cay",
    headline: "Beachfront Abaco luxury with canal dock and boardwalk access",
    description:
      "Stay at Bahama Beach Club in Treasure Cay—luxury beachfront living with private canal docking, boardwalk beach access, and proximity to resort amenities on Abaco’s celebrated shoreline.",
    localKeywords: [
      "Treasure Cay vacation rental",
      "Abaco Bahamas beach house",
      "Bahama Beach Club rental",
      "Treasure Cay canal dock",
      "Abaco beachfront villa",
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export const nap = {
  name: site.legalName,
  phone: site.phone,
  email: site.email,
  address: site.headquarters.full,
};
