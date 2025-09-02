// src/pages/About.jsx
export default function About() {
  return (
    <main className="section alt">
      <div className="container">
        <h1 className="section-title-2">About Blackstone Quarters</h1>
        <p className="lead" style={{ maxWidth: 820 }}>
          We’re a Sydney-based short-stay operator focused on clean, reliable,
          and compliance-first hosting. Our goal is simple: treat your property
          like a professional asset, deliver consistent returns, and protect
          your long-term value with great operations and transparent reporting.
        </p>

        <div className="aboutGrid">
          <article className="aboutCard">
            <h3>What we do</h3>
            <p>
              We offer either a <strong>Guaranteed Rent</strong> head-lease or a
              <strong> Management Agreement</strong> with performance-based
              income. We handle setup, styling, listings, pricing, guest
              screening, hotel-grade cleaning, maintenance triage, and monthly
              statements to you.
            </p>
          </article>

          <article className="aboutCard">
            <h3>How we operate</h3>
            <p>
              We’re compliance-first: strata awareness, up-front disclosure, and
              calendar planning around local caps. We’re owner-first:
              transparent communication, predictable payouts, and a no-party
              stance backed by verification & policies.
            </p>
          </article>
        </div>

        <h2 className="section-title-2" style={{ marginTop: 36 }}>
          Our Team
        </h2>
        <div className="teamGrid">
          <div className="member">
            <img src="/team/alex.jpg" alt="Alex – Operations" />
            <h4>Alex Chen</h4>
            <p className="smallNote">Operations & Guest Experience</p>
          </div>
          <div className="member">
            <img src="/team/jamie.jpg" alt="Jamie – Partnerships" />
            <h4>Jamie Patel</h4>
            <p className="smallNote">Owner Partnerships</p>
          </div>
          <div className="member">
            <img src="/team/sam.jpg" alt="Sam – Compliance" />
            <h4>Sam Nguyen</h4>
            <p className="smallNote">Compliance & Reporting</p>
          </div>
        </div>
      </div>
    </main>
  );
}
