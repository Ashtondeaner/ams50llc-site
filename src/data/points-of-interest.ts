import type { Region } from "@/data/properties";

export type PoiCategory =
  | "beach"
  | "dining"
  | "boating"
  | "shopping"
  | "nature"
  | "attraction";

export type PointOfInterest = {
  id: string;
  name: string;
  category: PoiCategory;
  region: Region;
  propertyIds: string[];
  distance: string;
  description: string;
  mapQuery: string;
};

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: "naples-fifth-ave",
    name: "Fifth Avenue South",
    category: "shopping",
    region: "naples",
    propertyIds: ["i102", "107-tahiti", "119-tahiti"],
    distance: "10–20 min",
    description: "Upscale dining, boutiques, and nightlife in Old Naples.",
    mapQuery: "Fifth Avenue South, Naples, FL",
  },
  {
    id: "naples-beach",
    name: "Naples Beach & Pier",
    category: "beach",
    region: "naples",
    propertyIds: ["i102", "107-tahiti", "119-tahiti"],
    distance: "15–25 min",
    description: "Classic Gulf beach, pier fishing, and sunset views.",
    mapQuery: "Naples Pier, Naples, FL",
  },
  {
    id: "ten-thousand-islands",
    name: "10,000 Islands",
    category: "boating",
    region: "naples",
    propertyIds: ["107-tahiti", "119-tahiti"],
    distance: "Direct by boat",
    description: "Mangrove maze, fishing, and island day trips—no bridges.",
    mapQuery: "Ten Thousand Islands, Florida",
  },
  {
    id: "naples-bay-marina",
    name: "Naples Bay Marina",
    category: "boating",
    region: "naples",
    propertyIds: ["i102"],
    distance: "On-site",
    description: "Boat rentals and marina services at Naples Bay Resort.",
    mapQuery: "Naples Bay Resort Marina, Naples, FL",
  },
  {
    id: "tc-beach",
    name: "Treasure Cay Beach",
    category: "beach",
    region: "bahamas",
    propertyIds: ["2001-bahama"],
    distance: "Boardwalk access",
    description: "Powder-soft sand and turquoise water ranked among the world’s best.",
    mapQuery: "Treasure Cay Beach, Abaco, Bahamas",
  },
  {
    id: "tc-marina",
    name: "Treasure Cay Marina",
    category: "boating",
    region: "bahamas",
    propertyIds: ["2001-bahama"],
    distance: "Short walk / boat",
    description: "Full-service marina, fuel, and Abaco cruising access.",
    mapQuery: "Treasure Cay Marina, Bahamas",
  },
  {
    id: "tc-golf",
    name: "Treasure Cay Golf Course",
    category: "attraction",
    region: "bahamas",
    propertyIds: ["2001-bahama"],
    distance: "5–10 min",
    description: "Scenic island golf in a relaxed resort setting.",
    mapQuery: "Treasure Cay Golf Course, Bahamas",
  },
];

export function getNearbyPoisForProperty(propertyId: string): PointOfInterest[] {
  return pointsOfInterest.filter((p) => p.propertyIds.includes(propertyId));
}

export function getPoisByRegion(region: Region): PointOfInterest[] {
  return pointsOfInterest.filter((p) => p.region === region);
}
