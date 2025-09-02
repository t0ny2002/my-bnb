// src/pages/HowItWorks.jsx
export default function HowItWorks() {
  const steps = [
    {
      title: '1) Property Walkthrough',
      body: 'We inspect and assess earning potential, strata/LEP rules, and fit-out needs.',
    },
    {
      title: '2) Simple Agreement',
      body: 'Choose a fixed-term head-lease (Guaranteed Rent) or a Management Agreement that clearly defines responsibilities and inclusions.',
    },
    {
      title: '3) Setup & Styling',
      body: 'We furnish, photograph, and create listings. Dynamic pricing + guest screening are configured from day one.',
    },
    {
      title: '4) Listing & Launch',
      body: 'We publish across the right channels, calibrate pricing to seasonality, and tune for conversion.',
    },
    {
      title: '5) Fully Managed',
      body: 'Cleaning, linen, amenities, check-ins, maintenance triage, and 24/7 guest support—handled by us.',
    },
    {
      title: '6) Reporting & Payouts',
      body: 'Clear monthly statements and predictable payouts. We review performance and plan ahead around local caps.',
    },
  ];

  return (
    <main className="section alt">
      <div className="container">
        <h1 className="section-title-2">How it Works</h1>
        <p className="lead" style={{ maxWidth: 820 }}>
          A simple, owner-first process designed for steady results and
          hassle-free operations.
        </p>

        <div className="howGrid">
          {steps.map((s, i) => (
            <article key={i} className="howCard">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
