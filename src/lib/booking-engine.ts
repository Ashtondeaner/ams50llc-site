import {
  getPricing,
  seedBlockedRanges,
  type DateRange,
  type PropertyPricing,
} from "@/data/pricing";

export type StayQuote = {
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  nightlyBase: number;
  weekendNights: number;
  subtotal: number;
  cleaningFee: number;
  feeLabel: string;
  tax: number;
  taxRate: number;
  total: number;
  securityDeposit: number;
  currency: "USD";
  minNights: number;
  lineItems: { label: string; amount: number }[];
};

export type AvailabilityResult =
  | { ok: true }
  | { ok: false; reason: string };

const DAY_MS = 86_400_000;

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseISODate(checkIn).getTime();
  const b = parseISODate(checkOut).getTime();
  return Math.round((b - a) / DAY_MS);
}

export function formatDisplayDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMoney(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMoneyExact(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatRateWithFees(pricing: PropertyPricing): string {
  return `${formatMoney(pricing.nightlyRate)}/night ${pricing.rateSuffix}`;
}

function dateInRange(iso: string, range: DateRange): boolean {
  return iso >= range.start && iso < range.end;
}

export function isNightBlocked(
  propertyId: string,
  nightISO: string,
  extraBlocked: DateRange[] = [],
): boolean {
  const ranges = [
    ...(seedBlockedRanges[propertyId] ?? []),
    ...extraBlocked,
  ];
  return ranges.some((r) => dateInRange(nightISO, r));
}

export function rangeOverlapsBlocked(
  propertyId: string,
  checkIn: string,
  checkOut: string,
  extraBlocked: DateRange[] = [],
): boolean {
  const nights = nightsBetween(checkIn, checkOut);
  for (let i = 0; i < nights; i++) {
    if (isNightBlocked(propertyId, addDays(checkIn, i), extraBlocked)) {
      return true;
    }
  }
  return false;
}

export function checkAvailability(
  propertyId: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  extraBlocked: DateRange[] = [],
): AvailabilityResult {
  const pricing = getPricing(propertyId);
  if (!pricing) return { ok: false, reason: "Property pricing not found." };
  if (!checkIn || !checkOut) {
    return { ok: false, reason: "Select check-in and check-out dates." };
  }
  if (checkOut <= checkIn) {
    return { ok: false, reason: "Check-out must be after check-in." };
  }
  if (checkIn < todayISO()) {
    return { ok: false, reason: "Check-in cannot be in the past." };
  }
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < pricing.minNights) {
    return {
      ok: false,
      reason: `Minimum stay is ${pricing.minNights} nights.`,
    };
  }
  if (nights > pricing.maxNights) {
    return {
      ok: false,
      reason: `Maximum stay is ${pricing.maxNights} nights.`,
    };
  }
  if (guests < 1 || guests > pricing.maxGuests) {
    return {
      ok: false,
      reason: `Guest count must be between 1 and ${pricing.maxGuests}.`,
    };
  }
  if (rangeOverlapsBlocked(propertyId, checkIn, checkOut, extraBlocked)) {
    return {
      ok: false,
      reason: "Selected dates overlap an unavailable period.",
    };
  }
  return { ok: true };
}

export function quoteStay(
  propertyId: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  extraBlocked: DateRange[] = [],
): StayQuote | null {
  const pricing = getPricing(propertyId);
  if (!pricing) return null;
  const availability = checkAvailability(
    propertyId,
    checkIn,
    checkOut,
    guests,
    extraBlocked,
  );
  if (!availability.ok) return null;

  const nights = nightsBetween(checkIn, checkOut);
  let weekendNights = 0;
  for (let i = 0; i < nights; i++) {
    const day = parseISODate(addDays(checkIn, i)).getDay();
    if (day === 5 || day === 6) weekendNights++;
  }
  const subtotal = nights * pricing.nightlyRate;
  const tax = Math.round((subtotal + pricing.cleaningFee) * pricing.taxRate);
  const total = subtotal + pricing.cleaningFee + tax;

  return {
    propertyId,
    propertyName: pricing.propertyName,
    checkIn,
    checkOut,
    nights,
    guests,
    nightlyBase: pricing.nightlyRate,
    weekendNights,
    subtotal,
    cleaningFee: pricing.cleaningFee,
    feeLabel: pricing.feeLabel,
    tax,
    taxRate: pricing.taxRate,
    total,
    securityDeposit: pricing.securityDeposit,
    currency: "USD",
    minNights: pricing.minNights,
    lineItems: [
      {
        label: `${formatMoney(pricing.nightlyRate)} × ${nights} night${nights === 1 ? "" : "s"}`,
        amount: subtotal,
      },
      { label: pricing.feeLabel, amount: pricing.cleaningFee },
      {
        label: `Taxes (${Math.round(pricing.taxRate * 100)}%)`,
        amount: tax,
      },
    ],
  };
}

export type CalendarCell = {
  iso: string;
  day: number;
  inMonth: boolean;
  past: boolean;
  blocked: boolean;
  selected: boolean;
  inRange: boolean;
  isCheckIn: boolean;
  isCheckOut: boolean;
};

export function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function buildMonthGrid(
  year: number,
  month: number,
  propertyId: string,
  checkIn: string | null,
  checkOut: string | null,
  extraBlocked: DateRange[] = [],
): CalendarCell[] {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];
  const today = todayISO();

  for (let i = 0; i < startPad; i++) {
    const d = new Date(year, month, 1 - (startPad - i));
    const iso = toISODate(d);
    cells.push({
      iso,
      day: d.getDate(),
      inMonth: false,
      past: iso < today,
      blocked: isNightBlocked(propertyId, iso, extraBlocked),
      selected: false,
      inRange: false,
      isCheckIn: false,
      isCheckOut: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toISODate(new Date(year, month, day));
    const isCheckIn = checkIn === iso;
    const isCheckOut = checkOut === iso;
    const inRange =
      !!checkIn &&
      !!checkOut &&
      iso > checkIn &&
      iso < checkOut;
    cells.push({
      iso,
      day,
      inMonth: true,
      past: iso < today,
      blocked: isNightBlocked(propertyId, iso, extraBlocked),
      selected: isCheckIn || isCheckOut,
      inRange,
      isCheckIn,
      isCheckOut,
    });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1];
    const next = addDays(last.iso, 1);
    const d = parseISODate(next);
    cells.push({
      iso: next,
      day: d.getDate(),
      inMonth: false,
      past: next < today,
      blocked: isNightBlocked(propertyId, next, extraBlocked),
      selected: false,
      inRange: false,
      isCheckIn: false,
      isCheckOut: false,
    });
  }

  return cells;
}
