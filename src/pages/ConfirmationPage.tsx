import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/data/properties";
import { formatDisplayDate, formatMoney } from "@/lib/booking-engine";
import { useBookingStore } from "@/lib/booking-store";

export function ConfirmationPage() {
  const { id } = useParams();
  const reservation = useBookingStore((s) =>
    id ? s.getReservation(id) : undefined,
  );

  if (!reservation) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl">Reservation not found</h1>
        <ButtonLink to="/book" className="mt-6">
          Back to booking
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-bg-elevated p-8 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h1 className="mt-4 font-display text-3xl text-fg">Request confirmed</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Confirmation ID <span className="font-medium text-fg">{reservation.id}</span>
        </p>
        <div className="mt-6 space-y-2 border-t border-border pt-6 text-left text-sm">
          <p>
            <span className="text-fg-muted">Property</span>
            <br />
            <span className="font-medium">{reservation.propertyName}</span>
          </p>
          <p>
            <span className="text-fg-muted">Dates</span>
            <br />
            {formatDisplayDate(reservation.checkIn)} →{" "}
            {formatDisplayDate(reservation.checkOut)}
          </p>
          <p>
            <span className="text-fg-muted">Guests</span>
            <br />
            {reservation.guests}
          </p>
          <p>
            <span className="text-fg-muted">Guest</span>
            <br />
            {reservation.guestName} · {reservation.guestEmail}
          </p>
          <p>
            <span className="text-fg-muted">Estimated total</span>
            <br />
            <span className="text-lg font-semibold">
              {formatMoney(reservation.total)}
            </span>
          </p>
        </div>
        <p className="mt-6 text-sm text-fg-muted">
          Our team will follow up at {reservation.guestEmail}. Reach us anytime at{" "}
          <a href={`mailto:${site.email}`} className="text-primary hover:underline">
            {site.email}
          </a>{" "}
          or {site.phone}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/properties">Browse properties</ButtonLink>
          <ButtonLink to="/" variant="outline">
            Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
