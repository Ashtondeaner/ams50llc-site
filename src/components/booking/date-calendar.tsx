import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "@/data/pricing";
import {
  buildMonthGrid,
  monthLabel,
  todayISO,
} from "@/lib/booking-engine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DateCalendar({
  propertyId,
  checkIn,
  checkOut,
  onChange,
  extraBlocked = [],
  className,
}: {
  propertyId: string;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  extraBlocked?: DateRange[];
  className?: string;
}) {
  const now = new Date();
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const cells = useMemo(
    () =>
      buildMonthGrid(
        cursor.year,
        cursor.month,
        propertyId,
        checkIn,
        checkOut,
        extraBlocked,
      ),
    [cursor, propertyId, checkIn, checkOut, extraBlocked],
  );

  function handleDayClick(iso: string, disabled: boolean) {
    if (disabled) return;
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      return;
    }
    if (iso <= checkIn) {
      onChange(iso, null);
      return;
    }
    onChange(checkIn, iso);
  }

  const canGoPrev =
    cursor.year > now.getFullYear() ||
    (cursor.year === now.getFullYear() && cursor.month > now.getMonth());

  return (
    <div className={cn("select-none", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() =>
            setCursor((c) => {
              const d = new Date(c.year, c.month - 1, 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })
          }
          disabled={!canGoPrev}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <p className="font-display text-base text-fg">
          {monthLabel(cursor.year, cursor.month)}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() =>
            setCursor((c) => {
              const d = new Date(c.year, c.month + 1, 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })
          }
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[0.7rem] font-medium uppercase tracking-wide text-fg-subtle">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell) => {
          const disabled =
            !cell.inMonth || cell.past || cell.blocked || cell.iso < todayISO();
          return (
            <button
              key={`${cell.iso}-${cell.inMonth}`}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(cell.iso, disabled)}
              className={cn(
                "relative flex h-9 items-center justify-center rounded-md text-sm transition-colors",
                !cell.inMonth && "invisible",
                disabled &&
                  cell.inMonth &&
                  "cursor-not-allowed text-fg-subtle line-through opacity-40",
                !disabled &&
                  !cell.selected &&
                  !cell.inRange &&
                  "text-fg hover:bg-bg-subtle",
                cell.inRange && "bg-primary/10 text-fg",
                cell.selected && "bg-primary font-semibold text-primary-fg",
                cell.blocked && cell.inMonth && !cell.past && "bg-bg-subtle",
              )}
              title={cell.blocked ? "Unavailable" : cell.iso}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-[0.7rem] text-fg-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-primary" /> Selected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-primary/15" /> Stay
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-bg-subtle ring-1 ring-border" />{" "}
          Unavailable
        </span>
      </div>
    </div>
  );
}
