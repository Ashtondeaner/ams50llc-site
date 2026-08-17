interface NavLink {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top">
          <span className="brand-mark">A50</span>
          <span className="brand-name">AMS50 LLC</span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary header-cta" href="#contact">
          Get a quote
        </a>
      </div>
    </header>
  )
}
