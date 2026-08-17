export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <span className="brand-name">AMS50 LLC</span>
          <p className="footer-tagline">Building with purpose, delivering with pride.</p>
        </div>
        <p className="footer-copy">
          © {year} AMS50 LLC. All rights reserved. Licensed &amp; insured.
        </p>
      </div>
    </footer>
  )
}
