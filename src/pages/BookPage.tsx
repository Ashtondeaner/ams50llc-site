import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DateCalendar } from "@/components/booking/date-calendar";
import { Button } from "@/components/ui/button";
import { getPricing } from "@/data/pricing";
import {
  getPropertyBySlug,
  properties,
  site,
} from "@/data/properties";
import {
  checkAvailability,
  formatDisplayDate,
  formatMoney,
  quoteStay,
} from "@/lib/booking-engine";
import { useBookingStore } from "@/lib/booking-store";

export function BookPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialSlug = params.get("property") ?? properties[0]?.slug ?? "";
  const [slug, setSlug] = useState(initialSlug);
  const property = getPropertyBySlug(slug) ?? properties[0];
  const pricing = property ? getPricing(property.id) : undefined;
  const extraBlocked = useBookingStore((s) =>
    property ? s.getBookedRanges(property.id) : [],
  );
  const addReservation = useBookingStore((s) => s.addReservation);

  const [checkIn, setCheckIn] = useState<string | null>(
    params.get("checkIn"),
  );
  const [checkOut, setCheckOut] = useState<string | null>(
    params.get("checkOut"),
  );
  const [guests, setGuests] = useState(Number(params.get("guests")) || 2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const quote = useMemo(() => {
    if (!property || !checkIn || !checkOut) return null;
    return quoteStay(property.id, checkIn, checkOut, guests, extraBlocked);
  }, [property, checkIn, checkOut, guests, extraBlocked]);

  const availability = useMemo(() => {
    if (!property || !checkIn || !checkOut) return null;
    return checkAvailability(
      property.id,
      checkIn,
      checkOut,
      guests,
      extraBlocked,
    );
  }, [property, checkIn, checkOut, guests, extraBlocked]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!quote || !property) return;
    setSubmitting(true);
    const reservation = addReservation(quote, { name, email, phone });
    navigate(`/book/confirmation/${reservation.id}`);
  }

  if (!property || !pricing) {
    return (
      <div className="container-page py-16 text-center">
        <p>No properties available.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Direct booking
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg">Book your stay</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Select a property and dates. Confirmations are handled by{" "}
        {site.legalName}. Questions:{" "}
        <a href={`mailto:${site.email}`} className="text-primary hover:underline">
          {site.email}
        </a>
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <form onSubmit={onSubmit} className="space-y-6 lg:col-span-7">
          <label className="block text-sm font-medium">
            Property
            <select
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setCheckIn(null);
                setCheckOut(null);
              }}
              className="mt-1.5 w-full rounded-md border border-border bg-bg-elevated px-3 py-2.5 text-sm"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-2xl border border-border bg-bg-elevated p-4">
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

          <label className="block text-sm font-medium">
            Guests (max {pricing.maxGuests})
            <input
              type="number"
              min={1}
              max={pricing.maxGuests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 1)}
              className="mt-1.5 w-full rounded-md border border-border bg-bg-elevated px-3 py-2.5 text-sm"
            />
          </label>

          {availability && !availability.ok ? (
            <p className="text-sm text-red-700">{availability.reason}</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium sm:col-span-2">
              Full name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-border bg-bg-elevated px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm font-medium">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-border bg-bg-elevated px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm font-medium">
              Phone
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-border bg-bg-elevated px-3 py-2.5 text-sm"
              />
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={!quote || submitting}
          >
            {submitting ? "Confirming…" : "Confirm reservation request"}
          </Button>
        </form>

        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Summary
            </p>
            <h2 className="mt-2 font-display text-2xl text-fg">
              {property.name}
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              {formatMoney(pricing.nightlyRate)}/night {pricing.rateSuffix}
            </p>
            {quote ? (
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <p>
                  {formatDisplayDate(quote.checkIn)} →{" "}
                  {formatDisplayDate(quote.checkOut)}
                </p>
                <p className="text-fg-muted">
                  {quote.nights} nights · {quote.guests} guests
                </p>
                {quote.lineItems.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4">
                    <span className="text-fg-muted">{item.label}</span>
                    <span className="font-medium tabular-nums">
                      {formatMoney(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {formatMoney(quote.total)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-fg-muted">
                Select check-in and check-out to see a quote.
              </p>
            )}
            <p className="mt-4 text-xs text-fg-subtle">
              Demo booking engine stores requests in this browser only. Connect a
              PMS for live inventory and payments.
            </p>
            <Link
              to={`/properties/${property.slug}`}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              View property details
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
