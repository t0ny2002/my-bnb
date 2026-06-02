// src/pages/Home.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiHome,
  FiShield,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';
import './Home.css';

const HERO_IMAGES_LEFT = [
  '/38-york-st-2.png',
  '/243-Pyrmont-St-pic-2.png',
  '/50-murray-st-1.png',
];

const HERO_IMAGES_RIGHT = [
  '/38-york-st-3.png',
  '/50-murray-st-2.png',
  '/243-Pyrmont-St-pic-3-compressed.jpg',
];

const TRUST_ITEMS = ['STRA-aware', 'No-party policy', 'Insurer-backed cover*'];

const VALUE_CARDS = [
  {
    title: 'Guaranteed Rent',
    text: 'Fixed, on-time payments under a head-lease—no vacancy risk for you.',
    icon: '/rent.png',
  },
  {
    title: 'Hotel-Grade Operations',
    text: 'Pro cleaning, restocking, maintenance triage, and 24/7 guest support.',
    icon: '/wipe.png',
  },
  {
    title: 'Compliance-First',
    text: 'Up-front disclosure, strata awareness, and calendar planning around local caps.',
    icon: '/compliance.png',
  },
  {
    title: 'Damage Protection',
    text: 'Guest screening, and liability/contents insurer-backed cover.',
    icon: '/insurance-icon.png',
  },
];

const HOW_STEPS = [
  {
    title: 'Property Walkthrough',
    text: 'We assess earning potential, strata/LEP rules, and fit-out needs.',
  },
  {
    title: 'Simple Agreement',
    text: 'Choose Guaranteed Rent (head-lease) or Management—clear inclusions.',
  },
  {
    title: 'Setup & Styling',
    text: 'We furnish, photograph, and craft listings. Pricing & screening from day one.',
  },
  {
    title: 'Listing & Launch',
    text: 'Right channels, seasonal pricing calibration, conversion tuning.',
  },
  {
    title: 'Fully Managed',
    text: 'Cleaning, linen, check-ins, maintenance triage, 24/7 guest support.',
  },
  {
    title: 'Reporting & Payouts',
    text: 'Clear monthly statements and predictable payouts.',
  },
];

const FAQS = [
  {
    question: 'How do you protect the property?',
    answer:
      'Strict guest verification, noise policies, routine inspections, and a no-party stance backed by monitoring.',
  },
  {
    question: 'Who pays utilities and wear-and-tear?',
    answer:
      'Utilities are covered per agreement. We budget for consumables, cleaning and minor maintenance triage.',
  },
  {
    question: 'Do I get paid if occupancy is low?',
    answer:
      'With Guaranteed Rent, yes—your payout is fixed for the term. With Management, payouts vary with performance.',
  },
];

const HERO_STATS = [
  {
    value: <Counter to={96} suffix="%" />,
    label: '4.8–5★ stays',
    icon: <FiStar />,
  },
  {
    value: <Counter to={15} suffix="%" />,
    label: 'Above average long-term rent in area*',
    icon: <FiTrendingUp />,
  },
  {
    value: <Counter to={0} />,
    label: 'Vacancy risk with GR',
    icon: <FiShield />,
  },
];

const CALC_METRICS = [
  { key: 'nights', title: 'Nights / month', icon: <FiCalendar /> },
  { key: 'gross', title: 'Gross revenue', icon: <FiBarChart2 /> },
  { key: 'management', title: 'Owner Management', icon: <FiHome /> },
  { key: 'guaranteed', title: 'Owner (Guaranteed Rent)', icon: <FiShield /> },
];

function useReveal(selector = '[data-reveal]') {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

function Counter({ to = 100, prefix = '', suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);
  const nodeRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current || !nodeRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        hasRun.current = true;
        const start = performance.now();
        const tick = (time) => {
          const progress = Math.min(1, (time - start) / duration);
          setVal(Math.round(progress * to));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );

    obs.observe(nodeRef.current);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function FadeImage({ src, alt = '' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={loaded ? 'is-loaded' : ''}
      onLoad={() => setLoaded(true)}
      loading="eager"
      decoding="async"
    />
  );
}

export default function Home() {
  useReveal();

  const [rate, setRate] = useState(240);
  const [occ, setOcc] = useState(72);
  const [fee, setFee] = useState(18);

  const nights = Math.round((occ / 100) * 30);
  const gross = Math.round(rate * nights);
  const mgmtOwner = Math.round(gross * ((100 - fee) / 100));
  const guaranteed = Math.round(gross * 0.7);

  const metricValues = {
    nights,
    gross: `$${gross.toLocaleString()}`,
    management: `$${mgmtOwner.toLocaleString()}`,
    guaranteed: `$${guaranteed.toLocaleString()}`,
  };

  const metricNotes = {
    management: `after a ${fee}% fee`,
    guaranteed: 'no vacancy risk',
  };

  return (
    <main className="home home--light" aria-labelledby="hero-title">
      <section className="hero" data-reveal>
        <div className="hero__layout home-shell">
          <div className="hero__gallery hero__gallery--left" aria-hidden="true">
            {HERO_IMAGES_LEFT.map((src) => (
              <FadeImage key={src} src={src} />
            ))}
          </div>

          <div className="hero__content">
            <p className="home-eyebrow">Sydney short-stay specialists</p>
            <h1 id="hero-title">
              <span>AIRBNB</span>
              <span className="hero__title-wide">MANAGEMENT</span>
            </h1>
            <p className="lead">
              Guaranteed rent options or performance-based management. We handle
              setup, cleaning, pricing, guests, and reporting—end to end.
            </p>

            <div className="hero__ctas">
              <Link to="/contact" className="btn btn-primary">
                Request a Free Appraisal
              </Link>
              <a href="#how" className="btn btn-ghost">
                See How it Works
              </a>
            </div>

            <ul className="hero__trust" aria-label="Trust signals">
              {TRUST_ITEMS.map((item) => (
                <li key={item}>
                  <FiCheckCircle aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="hero__stats">
              {HERO_STATS.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="stat__icon" aria-hidden="true">
                    {stat.icon}
                  </span>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="tiny">
              *Subject to property, seasonality, and policy terms.
            </p>
          </div>

          <div
            className="hero__gallery hero__gallery--right"
            aria-hidden="true"
          >
            {HERO_IMAGES_RIGHT.map((src) => (
              <FadeImage key={src} src={src} />
            ))}
          </div>
        </div>
        <a className="hero__scroll" href="#why" aria-label="Scroll to content">
          ↓
        </a>
      </section>

      <section id="why" className="value home-band" data-reveal>
        <div className="home-shell">
          <header className="section-hdr section-hdr--split">
            <div>
              <p className="home-eyebrow">Owner-first operations</p>
              <h2>Why partner with Crownstone Quarters?</h2>
            </div>
            <p className="muted">
              We pair hotel-grade operations with owner-first reporting and
              transparent payouts.
            </p>
          </header>

          <div className="value__grid">
            {VALUE_CARDS.map((card) => (
              <article key={card.title} className="card card--hover">
                <div className="card__icon" aria-hidden="true">
                  <img src={card.icon} alt="" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="how home-band" data-reveal>
        <div className="home-shell how__layout">
          <header className="section-hdr how__intro">
            <p className="home-eyebrow">A sharper launch path</p>
            <h2>How it works</h2>
            <p className="muted">
              A simple, owner-first process designed for steady results.
            </p>
          </header>

          <ol className="timeline">
            {HOW_STEPS.map((step, index) => (
              <li key={step.title} className="timeline__item">
                <div className="timeline__dot" aria-hidden="true">
                  {index + 1}
                </div>
                <div className="timeline__card">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="calc"
        className="calc home-band"
        data-reveal
        aria-labelledby="calc-h"
      >
        <div className="home-shell">
          <header className="section-hdr section-hdr--split">
            <div>
              <p className="home-eyebrow">Payout estimator</p>
              <h2 id="calc-h">Estimate your monthly payout</h2>
            </div>
            <p className="muted">
              Quick, directional numbers—final figures depend on property,
              seasonality and local caps.
            </p>
          </header>

          <div className="calc__panel">
            <div className="calc__inputs">
              <div className="field">
                <label htmlFor="rate">Avg nightly AirBNB rate (A$)</label>
                <input
                  id="rate"
                  type="range"
                  min="120"
                  max="700"
                  step="10"
                  value={rate}
                  onChange={(e) => setRate(+e.target.value)}
                />
                <div className="field__val">${rate}</div>
              </div>
              <div className="field">
                <label htmlFor="occupancy">Occupancy (%)</label>
                <input
                  id="occupancy"
                  type="range"
                  min="40"
                  max="95"
                  step="1"
                  value={occ}
                  onChange={(e) => setOcc(+e.target.value)}
                />
                <div className="field__val">{occ}%</div>
              </div>
              <div className="field">
                <label htmlFor="fee">Management fee (%)</label>
                <input
                  id="fee"
                  type="range"
                  min="12"
                  max="25"
                  step="1"
                  value={fee}
                  onChange={(e) => setFee(+e.target.value)}
                />
                <div className="field__val">{fee}%</div>
              </div>
              <div className="calc__cta">
                <Link className="btn btn-primary" to="/contact">
                  Get a tailored appraisal
                </Link>
              </div>
            </div>

            <div className="calc__cards">
              {CALC_METRICS.map(({ key, title, icon }) => (
                <article
                  className={`kpi ${key === 'guaranteed' ? 'kpi--accent' : ''}`}
                  key={key}
                >
                  <span className="kpi__icon" aria-hidden="true">
                    {icon}
                  </span>
                  <h3>{title}</h3>
                  <div className="kpi__num">{metricValues[key]}</div>
                  {metricNotes[key] && (
                    <p className="tiny muted">{metricNotes[key]}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq home-band" data-reveal>
        <div className="home-shell faq__layout">
          <header className="section-hdr">
            <p className="home-eyebrow">Common questions</p>
            <h2>FAQs</h2>
          </header>
          <div className="faq__list">
            {FAQS.map((item) => (
              <details key={item.question} className="faq__item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
