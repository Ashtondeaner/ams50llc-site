export type DateRange = {
  start: string;
  end: string;
  reason?: string;
};

export type PropertyPricing = {
  propertyId: string;
  propertyName: string;
  nightlyRate: number;
  rateSuffix: string;
  cleaningFee: number;
  feeLabel: string;
  taxRate: number;
  securityDeposit: number;
  minNights: number;
  maxNights: number;
  maxGuests: number;
  currency: "USD";
};

export const propertyPricing: Record<string, PropertyPricing> = {
  i102: {
    propertyId: "i102",
    propertyName: "I102 Naples Bay Resort",
    nightlyRate: 375,
    rateSuffix: "+ Resort fees",
    cleaningFee: 175,
    feeLabel: "Resort & cleaning fees",
    taxRate: 0.12,
    securityDeposit: 500,
    minNights: 3,
    maxNights: 21,
    maxGuests: 6,
    currency: "USD",
  },
  "107-tahiti": {
    propertyId: "107-tahiti",
    propertyName: "107 Tahiti Street",
    nightlyRate: 275,
    rateSuffix: "+ fees",
    cleaningFee: 150,
    feeLabel: "Cleaning & service fees",
    taxRate: 0.12,
    securityDeposit: 400,
    minNights: 3,
    maxNights: 21,
    maxGuests: 4,
    currency: "USD",
  },
  "119-tahiti": {
    propertyId: "119-tahiti",
    propertyName: "119 Tahiti Street",
    nightlyRate: 475,
    rateSuffix: "+ fees",
    cleaningFee: 200,
    feeLabel: "Cleaning & service fees",
    taxRate: 0.12,
    securityDeposit: 600,
    minNights: 3,
    maxNights: 28,
    maxGuests: 8,
    currency: "USD",
  },
  "2001-bahama": {
    propertyId: "2001-bahama",
    propertyName: "2001 Bahama Beach Club",
    nightlyRate: 675,
    rateSuffix: "+ fees",
    cleaningFee: 250,
    feeLabel: "Cleaning & service fees",
    taxRate: 0.1,
    securityDeposit: 750,
    minNights: 4,
    maxNights: 21,
    maxGuests: 10,
    currency: "USD",
  },
};

/**
 * Demo inventory blocks (exclusive end dates).
 * Replace with live PMS availability when integrated.
 */
export const seedBlockedRanges: Record<string, DateRange[]> = {
  i102: [
    { start: "2026-08-14", end: "2026-08-21", reason: "Booked" },
    { start: "2026-09-05", end: "2026-09-12", reason: "Booked" },
    { start: "2026-11-20", end: "2026-11-29", reason: "Thanksgiving" },
    { start: "2026-12-20", end: "2027-01-04", reason: "Holiday" },
  ],
  "107-tahiti": [
    { start: "2026-08-10", end: "2026-08-17", reason: "Booked" },
    { start: "2026-10-01", end: "2026-10-08", reason: "Booked" },
    { start: "2026-12-18", end: "2027-01-05", reason: "Holiday" },
  ],
  "119-tahiti": [
    { start: "2026-08-22", end: "2026-08-29", reason: "Booked" },
    { start: "2026-09-15", end: "2026-09-22", reason: "Booked" },
    { start: "2026-12-22", end: "2027-01-03", reason: "Holiday" },
  ],
  "2001-bahama": [
    { start: "2026-08-08", end: "2026-08-18", reason: "Booked" },
    { start: "2026-09-01", end: "2026-09-10", reason: "Booked" },
    { start: "2026-11-01", end: "2026-11-08", reason: "Maintenance" },
    { start: "2026-12-15", end: "2027-01-08", reason: "Holiday" },
  ],
};

export function getPricing(propertyId: string): PropertyPricing | undefined {
  return propertyPricing[propertyId];
}
