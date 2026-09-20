import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import type { Property } from "@/data/properties";
import { getPricing } from "@/data/pricing";
import {
  checkAvailability,
  formatDisplayDate,
  formatMoney,
  formatRateWithFees,
  quoteStay,
} from "@/lib/booking-engine";
import { useBookingStore } from "@/lib/booking-store";
import { DateCalendar } from "@/components/booking/date-calendar";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BookingWidget({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const pricing = getPricing(property.id);
  const getBookedRanges = useBookingStore((s) => s.getBookedRanges);
  const extraBlocked = getBookedRanges(property.id);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);

  const quote = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return quoteStay(property.id, checkIn, checkOut, guests, extraBlocked);
  }, [property.id, checkIn, checkOut, guests, extraBlocked]);

  const availability = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return checkAvailability(
      property.id,
      checkIn,
      checkOut,
      guests,
      extraBlocked,
    );
  }, [property.id, checkIn, checkOut, guests, extraBlocked]);

  if (!pricing) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Check availability
      </p>
      <p className="mt-2 font-display text-2xl text-fg">
        {formatMoney(pricing.nightlyRate)}
        <span className="text-base font-sans font-normal text-fg-muted">
          /night {pricing.rateSuffix}
        </span>
      </p>

      <div className="mt-4">
        <DateCalendar
          propertyId={property.id}
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(ci, co) => {
            setCheckIn(ci);
            setCheckOut(co);
          }}
          extraBlocked={extraBlocked}
        />
      </div>

      <label className="mt-4 block text-sm font-medium text-fg">
        Guests
        <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2">
          <Users className="size-4 text-fg-subtle" />
          <input
            type="number"
            min={1}
            max={pricing.maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value) || 1)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </label>

      {checkIn && checkOut && availability && !availability.ok ? (
        <p className="mt-3 text-sm text-red-700">{availability.reason}</p>
      ) : null}

      {quote ? (
        <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
          <p className="text-fg-muted">
            {formatDisplayDate(quote.checkIn)} →{" "}
            {formatDisplayDate(quote.checkOut)} · {quote.nights} nights
          </p>
          {quote.lineItems.map((item) => (
            <div key={item.label} className="flex justify-between gap-4">
              <span className="text-fg-muted">{item.label}</span>
              <span className="font-medium tabular-nums">
                {formatMoney(item.amount)}
              </span>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-t border-border pt-2 text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatMoney(quote.total)}</span>
          </div>
          <p className="text-xs text-fg-subtle">
            Security deposit {formatMoney(quote.securityDeposit)} held
            separately.
          </p>
        </div>
      ) : null}

      {quote ? (
        <ButtonLink
          to={`/book?property=${property.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
          size="lg"
          className="mt-5 w-full"
        >
          Continue to book
        </ButtonLink>
      ) : (
        <Button size="lg" className="mt-5 w-full" disabled>
          Select dates to continue
        </Button>
      )}

      <p className="mt-3 text-center text-xs text-fg-subtle">
        {formatRateWithFees(pricing)} · Min {pricing.minNights} nights
      </p>
    </div>
  );
}
