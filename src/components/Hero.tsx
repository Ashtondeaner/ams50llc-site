import { stats, values } from '../data'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Construction &amp; Facility Services</p>
          <h1>
            Building with purpose, <span className="accent">delivering with pride.</span>
          </h1>
          <p className="lead">
            AMS50 LLC partners with property owners and businesses to plan, build, and
            maintain spaces that last. From ground-up construction to ongoing facility
            care, we bring one accountable team to every job.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Start your project
            </a>
            <a className="btn btn-ghost" href="#services">
              Explore services
            </a>
          </div>
          <ul className="value-list">
            {values.map((value) => (
              <li key={value}>
                <span className="check" aria-hidden="true">
                  ✓
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-stats" aria-label="Company highlights">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
