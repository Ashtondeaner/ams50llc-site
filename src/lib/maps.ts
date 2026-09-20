export type MapLocation = {
  label: string;
  latitude: number;
  longitude: number;
  query: string;
  zoom?: number;
};

export function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function googleMapsEmbedUrl(loc: MapLocation): string {
  const zoom = loc.zoom ?? 15;
  const q = encodeURIComponent(
    `${loc.query}@${loc.latitude},${loc.longitude}`,
  );
  return `https://www.google.com/maps?q=${q}&z=${zoom}&hl=en&output=embed`;
}
