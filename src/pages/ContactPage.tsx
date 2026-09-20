import { useState, type FormEvent } from "react";
import { site, teamNamesList } from "@/data/properties";
import { Button } from "@/components/ui/button";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Get in touch
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg md:text-5xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        For information, FAQs, and reservation questions, email{" "}
        <a href={`mailto:${site.email}`} className="font-medium text-primary hover:underline">
          {site.email}
        </a>
        .
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-bg-elevated p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Headquarters
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg">
              {site.legalName}
              <br />
              {site.headquarters.line1}
              <br />
              {site.headquarters.line2}
            </p>
            <p className="mt-4 text-sm">
              <a href={`tel:${site.phoneTel}`} className="font-medium hover:text-primary">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a href={`mailto:${site.email}`} className="font-medium text-primary hover:underline">
                {site.email}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-elevated p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Partners / Hosts
            </p>
            <ul className="mt-3 space-y-2 text-sm text-fg-muted">
              {site.principals.map((p) => (
                <li key={p.name}>
                  <span className="font-medium text-fg">{p.name}</span>
                  <span> · {p.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-fg-subtle">
              Managed by {teamNamesList()}.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-bg-elevated p-6 shadow-[var(--shadow-soft)]"
        >
          {sent ? (
            <p className="text-sm text-fg">
              Thank you. This demo form does not send email—please contact us
              directly at {site.email} or {site.phone}.
            </p>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Name
                <input
                  required
                  className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm"
                />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input
                  required
                  type="email"
                  className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm"
                />
              </label>
              <label className="block text-sm font-medium">
                Message
                <textarea
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm"
                />
              </label>
              <Button type="submit" size="lg">
                Send message
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
