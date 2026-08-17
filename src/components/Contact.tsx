import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">Get in touch</p>
          <h2>Let&apos;s build something dependable</h2>
          <p>
            Tell us about your project and we&apos;ll put together a clear, no-obligation
            quote. Prefer to talk? Reach us directly.
          </p>
          <ul className="contact-details">
            <li>
              <span aria-hidden="true">📞</span>
              <a href="tel:+15551234567">(555) 123-4567</a>
            </li>
            <li>
              <span aria-hidden="true">✉️</span>
              <a href="mailto:hello@ams50llc.com">hello@ams50llc.com</a>
            </li>
            <li>
              <span aria-hidden="true">📍</span>
              Serving the greater metro area
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
