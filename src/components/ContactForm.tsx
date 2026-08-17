import { useState, type FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  message: string
}

const empty: FormState = { name: '', email: '', message: '' }

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(values: FormState): Partial<FormState> {
    const next: Partial<FormState> = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!isValidEmail(values.email)) next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10)
      next.message = 'Tell us a little more (at least 10 characters).'
    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon" aria-hidden="true">
          ✓
        </span>
        <h3>Thanks, {form.name.split(' ')[0]}!</h3>
        <p>
          Your request has been received. A member of the AMS50 team will reach out to{' '}
          <strong>{form.email}</strong> within one business day.
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setForm(empty)
            setErrors({})
            setSubmitted(false)
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Request a quote
      </button>
    </form>
  )
}
