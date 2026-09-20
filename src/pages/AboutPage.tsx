import { site, teamNamesList } from "@/data/properties";

export function AboutPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Our story
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl text-fg md:text-5xl">
        {site.legalName}
      </h1>
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-fg-muted">
        <p>
          {site.legalName} provides professional vacation rental management for a
          curated portfolio of waterfront homes in Naples, Florida and Treasure
          Cay, Abaco, Bahamas. Our focus is direct guest relationships, clear
          communication, and properties chosen for genuine Southwest Florida and
          Abaco lifestyle—boating access, beach proximity, and resort amenities.
        </p>
        <p>
          The portfolio is hosted by family partners {teamNamesList()}, operating
          from our Naples headquarters at {site.headquarters.full}.
        </p>
        <p>
          For information and FAQs, contact{" "}
          <a href={`mailto:${site.email}`} className="text-primary hover:underline">
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={`tel:${site.phoneTel}`} className="text-primary hover:underline">
            {site.phone}
          </a>
          .
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {site.principals.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-border bg-bg-elevated p-5"
          >
            <p className="font-display text-xl text-fg">{p.name}</p>
            <p className="mt-1 text-sm text-fg-muted">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
