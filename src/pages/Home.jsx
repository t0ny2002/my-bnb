// src/pages/Home.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function useReveal(selector = '[data-reveal]') {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            obs.unobserve(e.target);
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
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ref.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            setVal(Math.round(p * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    const node =
      document.getElementById(`cnt-${prefix}-${suffix}-${to}`) || null;
    if (node) obs.observe(node);
    return () => obs.disconnect();
  }, [to, prefix, suffix, duration]);

  return (
    <span id={`cnt-${prefix}-${suffix}-${to}`}>
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
  const homeRef = useRef(null);

  const testimonials = useMemo(
    () => [
      {
        quote:
          'Flawless from day one. Payouts were exactly as promised and the property is in better condition than when we handed it over.',
        name: 'Sarah & Daniel',
        role: 'Owners, Rhodes NSW',
      },
      {
        quote:
          'They understand strata, caps and compliance. Zero stress and the revenue beat our long-term lease by 28%.',
        name: 'Michael K.',
        role: 'Owner, Zetland NSW',
      },
      {
        quote:
          'Transparent monthly statements and quick comms. Guests are screened and our neighbors are happy.',
        name: 'Asha P.',
        role: 'Owner, Pyrmont NSW',
      },
    ],
    []
  );

  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTIdx((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  useEffect(() => {
    const root = homeRef.current;
    if (!root) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const supportsFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!isDesktop || !supportsFinePointer || prefersReducedMotion) return;

    const interactiveCards = Array.from(
      root.querySelectorAll('.card--hover, .timeline__card, .kpi')
    );

    if (!interactiveCards.length) return;

    const handleMove = (event) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
      target.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
      target.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
      target.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
    };

    const handleLeave = (event) => {
      const target = event.currentTarget;
      target.style.setProperty('--rx', '0deg');
      target.style.setProperty('--ry', '0deg');
      target.style.setProperty('--mx', '0%');
      target.style.setProperty('--my', '0%');
    };

    interactiveCards.forEach((card) => {
      card.addEventListener('pointermove', handleMove, { passive: true });
      card.addEventListener('pointerleave', handleLeave);
    });

    return () => {
      interactiveCards.forEach((card) => {
        card.removeEventListener('pointermove', handleMove);
        card.removeEventListener('pointerleave', handleLeave);
      });
    };
  }, []);

  // ROI mini-calculator
  const [rate, setRate] = useState(240);
  const [occ, setOcc] = useState(72);
  const [fee, setFee] = useState(18);
  const nights = Math.round((occ / 100) * 30);
  const gross = Math.round(rate * nights);
  const mgmtOwner = Math.round(gross * ((100 - fee) / 100));
  const guaranteed = Math.round(gross * 0.7); // conservative guaranteed rent example

  return (
    <main
      ref={homeRef}
      className="home section home--light home--cinematic"
      aria-labelledby="hero-title"
    >
      {/* ================ HERO ================= */}
      <section className="hero" data-reveal>
        <div className="hero__layout container">
          <div className="hero__gallery hero__gallery--left" aria-hidden="true">
            <FadeImage src="/38-york-st-2.png" />
            <FadeImage src="/243-Pyrmont-St-pic-2.png" />
            <FadeImage src="/50-murray-st-1.png" />
          </div>

          <div className="hero__content">
            <h1 id="hero-title">
              AIRBNB
              <br />
              MANAGEMENT
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

            <ul className="hero__trust">
              <li>
                <span className="dot" /> STRA-aware
              </li>
              <li>
                <span className="dot" /> No-party policy
              </li>
              <li>
                <span className="dot" /> Insurer-backed cover*
              </li>
            </ul>

            <div className="hero__stats">
              <div className="stat">
                <strong>
                  <Counter to={96} suffix="%" />
                </strong>
                <span>4.8–5★ stays</span>
              </div>
              <div className="stat">
                <strong>
                  <Counter to={15} suffix="%" />
                </strong>
                <span>Above average long-term rent in area*</span>
              </div>
              <div className="stat">
                <strong>
                  <Counter to={0} />
                </strong>
                <span>Vacancy risk with GR</span>
              </div>
            </div>
            <p className="tiny">
              *Subject to property, seasonality, and policy terms.
            </p>
          </div>

          <div
            className="hero__gallery hero__gallery--right"
            aria-hidden="true"
          >
            <FadeImage src="/38-york-st-3.png" />
            <FadeImage src="/50-murray-st-2.png" />
            <FadeImage src="/243-Pyrmont-St-pic-3-compressed.jpg" />
          </div>
        </div>
        <a className="hero__scroll" href="#why" aria-label="Scroll to content">
          ▼
        </a>
      </section>

      {/* ================ WHY / VALUE ================= */}
      <section id="why" className="value container" data-reveal>
        <header className="section-hdr">
          <h2>Why partner with Crownstone Quarters?</h2>
          <p className="muted">
            We pair hotel-grade operations with owner-first reporting and
            transparent payouts.
          </p>
        </header>

        <div className="value__grid">
          {[
            {
              t: 'Guaranteed Rent',
              d: 'Fixed, on-time payments under a head-lease—no vacancy risk for you.',
              icon: '/rent.png',
            },
            {
              t: 'Hotel-Grade Operations',
              d: 'Pro cleaning, restocking, maintenance triage, and 24/7 guest support.',
              icon: '/wipe.png',
            },
            {
              t: 'Compliance-First',
              d: 'Up-front disclosure, strata awareness, and calendar planning around local caps.',
              icon: '/compliance.png',
            },
            {
              t: 'Damage Protection',
              d: 'Guest screening, and liability/contents insurer-backed cover.',
              icon: '/insurance-icon.png',
            },
          ].map((c) => (
            <article key={c.t} className="card card--hover">
              <div className="card__icon" aria-hidden="true">
                <img
                  src={c.icon}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={c.invert ? 'icon--white' : undefined}
                />
              </div>
              <div>
                <h3>{c.t}</h3>
                <p className="muted">{c.d}</p>
              </div>
            </article>
          ))}
        </div>
        {/* <a className="section__scroll" href="#how" aria-label="Next section">
          ▾
        </a> */}
      </section>

      {/* ================ HOW IT WORKS (TIMELINE) ================= */}
      <section id="how" className="how container" data-reveal>
        <header className="section-hdr">
          <h2>How it works</h2>
          <p className="muted">
            A simple, owner-first process designed for steady results.
          </p>
        </header>

        <ol className="timeline">
          {[
            {
              t: 'Property Walkthrough',
              d: 'We assess earning potential, strata/LEP rules, and fit-out needs.',
            },
            {
              t: 'Simple Agreement',
              d: 'Choose Guaranteed Rent (head-lease) or Management—clear inclusions.',
            },
            {
              t: 'Setup & Styling',
              d: 'We furnish, photograph, and craft listings. Pricing & screening from day one.',
            },
            {
              t: 'Listing & Launch',
              d: 'Right channels, seasonal pricing calibration, conversion tuning.',
            },
            {
              t: 'Fully Managed',
              d: 'Cleaning, linen, check-ins, maintenance triage, 24/7 guest support.',
            },
            {
              t: 'Reporting & Payouts',
              d: 'Clear monthly statements and predictable payouts.',
            },
          ].map((s, i) => (
            <li key={s.t} className="timeline__item">
              <div className="timeline__dot" aria-hidden>
                {i + 1}
              </div>
              <div className="timeline__card">
                <h3>{s.t}</h3>
                <p className="muted">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* <a className="section__scroll" href="#calc" aria-label="Next section">
          ▾
        </a> */}
      </section>

      {/* ================ ROI MINI CALCULATOR ================= */}
      <section
        id="calc"
        className="calc container"
        data-reveal
        aria-labelledby="calc-h"
      >
        <header className="section-hdr">
          <h2 id="calc-h">Estimate your monthly payout</h2>
          <p className="muted">
            Quick, directional numbers—final figures depend on property,
            seasonality and local caps.
          </p>
        </header>

        <div className="calc__grid">
          <div className="calc__inputs">
            <div className="field">
              <label>Avg nightly AirBNB rate (A$)</label>
              <input
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
              <label>Occupancy (%)</label>
              <input
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
              <label>Management fee (%)</label>
              <input
                type="range"
                min="12"
                max="25"
                step="1"
                value={fee}
                onChange={(e) => setFee(+e.target.value)}
              />
              <div className="field__val">{fee}%</div>
            </div>
          </div>

          <div className="calc__cards">
            <article className="kpi">
              <h4>Nights / month</h4>
              <div className="kpi__num">{nights}</div>
            </article>
            <article className="kpi">
              <h4>Gross revenue</h4>
              <div className="kpi__num">${gross.toLocaleString()}</div>
            </article>
            <article className="kpi">
              <h4>Owner Management</h4>
              <div className="kpi__num">${mgmtOwner.toLocaleString()}</div>
              <p className="tiny muted">after a {fee}% fee</p>
            </article>
            <article className="kpi kpi--accent">
              <h4>Owner (Guaranteed Rent)</h4>
              <div className="kpi__num">${guaranteed.toLocaleString()}</div>
              <p className="tiny muted">no vacancy risk</p>
            </article>
          </div>
        </div>
        <div className="calc__cta">
          <a className="btn btn-primary" href="/contact">
            Get a tailored appraisal
          </a>
        </div>
        {/* <a className="section__scroll" href="#faq" aria-label="Next section">
          ▾
        </a> */}
      </section>

      {/* ================ FAQ ================= */}
      <section id="faq" className="faq container" data-reveal>
        <header className="section-hdr">
          <h2>FAQs</h2>
        </header>
        <div className="faq__list">
          {[
            {
              q: 'How do you protect the property?',
              a: 'Strict guest verification, noise policies, routine inspections, and a no-party stance backed by monitoring.',
            },
            {
              q: 'Who pays utilities and wear-and-tear?',
              a: 'Utilities are covered per agreement. We budget for consumables, cleaning and minor maintenance triage.',
            },
            {
              q: 'Do I get paid if occupancy is low?',
              a: 'With Guaranteed Rent, yes—your payout is fixed for the term. With Management, payouts vary with performance.',
            },
          ].map((f, i) => (
            <details key={i} className="faq__item">
              <summary>{f.q}</summary>
              <p className="muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
