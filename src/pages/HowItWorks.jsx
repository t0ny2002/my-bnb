// src/pages/HowItWorks.jsx
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCamera,
  FiCheckCircle,
  FiFileText,
  FiHeadphones,
  FiHome,
  FiSend,
} from 'react-icons/fi';
import './HowItWorks.css';

const STEPS = [
  {
    key: 'walkthrough',
    title: 'Property Walkthrough',
    blurb:
      'We inspect and assess earning potential, strata/LEP rules, and fit-out needs.',
    bullets: [
      'On-site/virtual inspection',
      'Compliance & fit-out advice',
      'Yield expectation',
    ],
    icon: <FiHome />,
  },
  {
    key: 'agreement',
    title: 'Simple Agreement',
    blurb:
      'Choose a fixed-term head-lease (Guaranteed Rent) or a Management Agreement that clearly defines responsibilities and inclusions.',
    bullets: [
      'Guaranteed Rent or Management',
      'Clear inclusions',
      'Owner-first terms',
    ],
    icon: <FiFileText />,
  },
  {
    key: 'setup',
    title: 'Setup & Styling',
    blurb:
      'We furnish, photograph, and create listings. Dynamic pricing + guest screening are configured from day one.',
    bullets: [
      'Furnishing plan',
      'Listing photography',
      'Guest screening setup',
    ],
    icon: <FiCamera />,
  },
  {
    key: 'launch',
    title: 'Listing & Launch',
    blurb:
      'We publish across the right channels, calibrate pricing to seasonality, and tune for conversion.',
    bullets: [
      'Channel distribution',
      'Seasonal pricing calibration',
      'Conversion optimisations',
    ],
    icon: <FiSend />,
  },
  {
    key: 'managed',
    title: 'Fully Managed',
    blurb:
      'Cleaning, linen, amenities, check-ins, maintenance triage, and 24/7 guest support—handled by us.',
    bullets: ['Cleaning and linen', 'Maintenance triage', '24/7 guest support'],
    icon: <FiHeadphones />,
  },
  {
    key: 'reporting',
    title: 'Reporting & Payouts',
    blurb:
      'Clear monthly statements and predictable payouts. We review performance and plan ahead around local caps.',
    bullets: [
      'Monthly statements',
      'Performance reviews',
      'Local cap planning',
    ],
    icon: <FiBarChart2 />,
  },
];

const PROMISES = [
  'Compliance-first setup',
  'Transparent owner reporting',
  'No-party operating policy',
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const active = STEPS[activeStep];

  const handleStep = useCallback((index) => {
    setActiveStep(index);
  }, []);

  return (
    <main className="how-page" aria-labelledby="how-title">
      <section className="how-hero">
        <div className="how-shell how-hero__grid">
          <div className="how-hero__copy">
            <p className="how-eyebrow">Owner-first process</p>
            <h1 id="how-title">How it Works</h1>
            <p>
              A simple, owner-first process designed for steady results and
              hassle-free operations.
            </p>
            <div className="how-hero__actions">
              <Link className="how-btn how-btn--primary" to="/contact">
                Get an Appraisal
                <FiArrowRight aria-hidden="true" />
              </Link>
              <a className="how-btn how-btn--ghost" href="#process">
                View process
              </a>
            </div>
          </div>

          <aside className="how-hero__panel" aria-label="Process summary">
            <strong>6</strong>
            <span>Clear stages from walkthrough to payout.</span>
            <ul>
              {PROMISES.map((promise) => (
                <li key={promise}>
                  <FiCheckCircle aria-hidden="true" />
                  {promise}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        id="process"
        className="how-process"
        aria-label="Process details"
      >
        <div className="how-shell how-process__grid">
          <nav className="how-stepper" aria-label="Process steps">
            <ol>
              {STEPS.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <li key={step.key}>
                    <button
                      type="button"
                      className={isActive ? 'is-active' : ''}
                      onClick={() => handleStep(index)}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span>{index + 1}</span>
                      {step.title}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="how-detail">
            <article className="how-feature-card">
              <div className="how-feature-card__top">
                <span className="how-feature-card__icon" aria-hidden="true">
                  {active.icon}
                </span>
                <span className="how-feature-card__count">
                  Step {activeStep + 1} of {STEPS.length}
                </span>
              </div>
              <h2>{active.title}</h2>
              <p>{active.blurb}</p>
              <ul>
                {active.bullets.map((item) => (
                  <li key={item}>
                    <FiCheckCircle aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <div className="how-card-grid">
              {STEPS.map((step, index) => (
                <button
                  type="button"
                  className={`how-mini-card ${
                    index === activeStep ? 'is-active' : ''
                  }`}
                  key={step.key}
                  onClick={() => handleStep(index)}
                >
                  <span aria-hidden="true">{step.icon}</span>
                  <strong>{step.title}</strong>
                  <small>{step.blurb}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="how-final" aria-label="Start your appraisal">
        <div className="how-shell how-final__panel">
          <div>
            <p className="how-eyebrow">Ready when you are</p>
            <h2>Start with a clear appraisal.</h2>
          </div>
          <Link className="how-btn how-btn--primary" to="/contact">
            Get an Appraisal
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
