import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DateRange } from "@/data/pricing";
import type { StayQuote } from "@/lib/booking-engine";

export type Reservation = {
  id: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  total: number;
  createdAt: string;
  status: "confirmed" | "pending";
};

type BookingState = {
  reservations: Reservation[];
  addReservation: (
    quote: StayQuote,
    guest: { name: string; email: string; phone?: string },
  ) => Reservation;
  getBookedRanges: (propertyId: string) => DateRange[];
  getReservation: (id: string) => Reservation | undefined;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      reservations: [],
      addReservation: (quote, guest) => {
        const reservation: Reservation = {
          id: `AMS-${Date.now().toString(36).toUpperCase()}`,
          propertyId: quote.propertyId,
          propertyName: quote.propertyName,
          checkIn: quote.checkIn,
          checkOut: quote.checkOut,
          guests: quote.guests,
          guestName: guest.name,
          guestEmail: guest.email,
          guestPhone: guest.phone,
          total: quote.total,
          createdAt: new Date().toISOString(),
          status: "confirmed",
        };
        set((s) => ({ reservations: [reservation, ...s.reservations] }));
        return reservation;
      },
      getBookedRanges: (propertyId) =>
        get()
          .reservations.filter((r) => r.propertyId === propertyId)
          .map((r) => ({
            start: r.checkIn,
            end: r.checkOut,
            reason: "Guest booking",
          })),
      getReservation: (id) => get().reservations.find((r) => r.id === id),
    }),
    { name: "ams50llc-bookings" },
  ),
);
