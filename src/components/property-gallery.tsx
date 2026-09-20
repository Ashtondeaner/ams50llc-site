import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-bg-subtle text-fg-subtle">
      <ImageIcon className="size-10 opacity-40" />
      <span className="max-w-[80%] text-center text-xs">{label}</span>
    </div>
  );
}

export function PropertyGallery({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = images.length;
  const active = images[index] ?? images[0];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, goTo, index]);

  if (count === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-bg-subtle">
        {failed[active] ? (
          <Placeholder label={`${alt} — photo ${index + 1}`} />
        ) : (
          <img
            key={active}
            src={active}
            alt={`${alt} — photo ${index + 1} of ${count}`}
            className="absolute inset-0 size-full object-cover"
            onError={() => setFailed((f) => ({ ...f, [active]: true }))}
          />
        )}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg-ink/35 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg-ink/35 to-transparent sm:w-24" />
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-elevated/95 text-fg shadow-[var(--shadow-soft)] backdrop-blur-sm sm:left-3 sm:size-12 focus-ring"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-elevated/95 text-fg shadow-[var(--shadow-soft)] backdrop-blur-sm sm:right-3 sm:size-12 focus-ring"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-bg-ink/80 px-3 py-1 text-xs font-medium tabular-nums text-fg-on-ink">
          {index + 1} / {count}
        </div>
      </div>

      {count > 1 ? (
        <div className="relative">
          <div
            className="flex gap-2 overflow-x-auto scroll-smooth py-0.5 sm:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="listbox"
            aria-label="Photo thumbnails"
          >
            {images.map((src, i) => (
              <button
                key={src}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                type="button"
                role="option"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "relative aspect-4/3 w-[22%] min-w-[4.5rem] max-w-[7.5rem] shrink-0 overflow-hidden rounded-lg border-2 focus-ring sm:w-24",
                  i === index
                    ? "border-primary"
                    : "border-transparent opacity-80 hover:opacity-100",
                )}
              >
                {failed[src] ? (
                  <div className="absolute inset-0 bg-bg-subtle" />
                ) : (
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                    loading="lazy"
                    onError={() => setFailed((f) => ({ ...f, [src]: true }))}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PropertyCardGallery({
  images,
  alt,
  propertySlug,
}: {
  images: string[];
  alt: string;
  propertySlug: string;
}) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const count = images.length;
  const active = images[index] ?? images[0];

  if (count === 0) return null;

  const go = (e: MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => ((i + delta) % count + count) % count);
    setFailed(false);
  };

  return (
    <div className="absolute inset-0">
      <Link
        to={`/properties/${propertySlug}`}
        className="absolute inset-0 z-0 block focus-ring"
        aria-label={`View ${alt}`}
      >
        {failed ? (
          <Placeholder label={alt} />
        ) : (
          <img
            src={active}
            alt={alt}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </Link>
      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => go(e, -1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-bg-elevated/90 text-fg opacity-100 shadow-sm backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100 focus-ring"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={(e) => go(e, 1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-bg-elevated/90 text-fg opacity-100 shadow-sm backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100 focus-ring"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      ) : null}
    </div>
  );
}
