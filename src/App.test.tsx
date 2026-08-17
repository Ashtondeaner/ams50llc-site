import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('AMS50 LLC site', () => {
  it('renders the hero headline and primary CTA', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /building with purpose/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /start your project/i })[0]).toBeInTheDocument()
  })

  it('lists the core services', () => {
    render(<App />)
    expect(screen.getByText('General Contracting')).toBeInTheDocument()
    expect(screen.getByText('Facility Maintenance')).toBeInTheDocument()
    expect(screen.getByText('Project Management')).toBeInTheDocument()
    expect(screen.getByText('Renovations')).toBeInTheDocument()
  })

  it('validates the contact form before submission', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /request a quote/i }))

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })

  it('shows a confirmation after a valid submission', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/name/i), 'Jordan Rivera')
    await user.type(screen.getByLabelText(/email/i), 'jordan@example.com')
    await user.type(
      screen.getByLabelText(/how can we help/i),
      'We need a quote for a 2,000 sq ft office renovation.',
    )
    await user.click(screen.getByRole('button', { name: /request a quote/i }))

    expect(screen.getByRole('status')).toHaveTextContent(/thanks, jordan/i)
    expect(screen.getByText(/jordan@example.com/i)).toBeInTheDocument()
  })
})
