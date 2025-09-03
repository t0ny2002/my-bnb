// src/pages/HowItWorks.jsx
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css'; // comment out if you paste styles into App.css

export default function HowItWorks() {
  const steps = useMemo(
    () => [
      {
        k: 'walkthrough',
        title: 'Property Walkthrough',
        blurb:
          'We inspect and assess earning potential, strata/LEP rules, and fit-out needs.',
      },
      {
        k: 'agreement',
        title: 'Simple Agreement',
        blurb:
          'Choose a fixed-term head-lease (Guaranteed Rent) or a Management Agreement that clearly defines responsibilities and inclusions.',
      },
      {
        k: 'setup',
        title: 'Setup & Styling',
        blurb:
          'We furnish, photograph, and create listings. Dynamic pricing + guest screening are configured from day one.',
      },
      {
        k: 'launch',
        title: 'Listing & Launch',
        blurb:
          'We publish across the right channels, calibrate pricing to seasonality, and tune for conversion.',
      },
      {
        k: 'managed',
        title: 'Fully Managed',
        blurb:
          'Cleaning, linen, amenities, check-ins, maintenance triage, and 24/7 guest support—handled by us.',
      },
      {
        k: 'reporting',
        title: 'Reporting & Payouts',
        blurb:
          'Clear monthly statements and predictable payouts. We review performance and plan ahead around local caps.',
      },
    ],
    []
  );

  const [open, setOpen] = useState(0);
  const refs = useRef([]);

  const handleOpen = (idx) => {
    setOpen(idx);
    // scroll the card nicely into view (esp. on mobile)
    const el = refs.current[idx];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  const onHeaderKey = (e, idx) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleOpen(idx);
    }
  };

  return (
    <main className="section alt howPage" aria-labelledby="how-title">
      <div className="container how">
        <header className="how__header">
          <h1 id="how-title" className="section-title-2">
            How it Works
          </h1>
          <p className="lead">
            A simple, owner-first process designed for steady results and
            hassle-free operations.
          </p>
        </header>

        {/* Sticky step navigator */}
        <nav className="how__nav" aria-label="Steps">
          <ol className="stepper" role="list">
            {steps.map((s, i) => {
              const active = i === open;
              return (
                <li
                  key={s.k}
                  className={`stepper__item ${active ? 'is-active' : ''}`}
                >
                  <button
                    className="stepper__btn"
                    aria-current={active ? 'step' : undefined}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    onClick={() => handleOpen(i)}
                  >
                    <span className="stepper__num">{i + 1}</span>
                    <span className="stepper__label">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Cards */}
        <section className="how__grid" aria-label="Process details">
          {steps.map((s, i) => {
            const expanded = i === open;
            return (
              <article
                ref={(el) => (refs.current[i] = el)}
                key={s.k}
                className={`howCard ${expanded ? 'is-open' : ''}`}
              >
                <header
                  className="howCard__header"
                  role="button"
                  tabIndex={0}
                  aria-expanded={expanded}
                  aria-controls={`step-panel-${s.k}`}
                  onClick={() => handleOpen(i)}
                  onKeyDown={(e) => onHeaderKey(e, i)}
                >
                  <div className="howCard__badge">{i + 1}</div>
                  <h3 className="howCard__title">{s.title}</h3>
                </header>

                <div
                  id={`step-panel-${s.k}`}
                  className="howCard__panel"
                  style={{ maxHeight: expanded ? 600 : 0 }}
                >
                  <p className="howCard__body">{s.blurb}</p>

                  {/* (Optional) quick bullets per step for extra clarity */}
                  {i === 0 && (
                    <ul className="miniList">
                      <li>On-site/virtual inspection</li>
                      <li>Compliance & fit-out advice</li>
                      <li>Yield expectation</li>
                    </ul>
                  )}
                  {i === 3 && (
                    <ul className="miniList">
                      <li>Channel distribution</li>
                      <li>Seasonal pricing calibration</li>
                      <li>Conversion optimisations</li>
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="how__cta" aria-label="Start">
          <Link className="btn btn-primary" to="/contact">
            Get an Appraisal
          </Link>
          <p className="smallNote">Fast reply. Zero obligation.</p>
        </section>
      </div>
    </main>
  );
}
