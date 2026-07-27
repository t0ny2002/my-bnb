// src/pages/About.jsx
import { motion as Motion } from 'framer-motion';
import {
  FiBarChart2,
  FiCheckCircle,
  FiFileText,
  FiHome,
  FiShield,
  FiUsers,
} from 'react-icons/fi';
import './About.css';

const SERVICES = [
  {
    title: 'Guaranteed Rent (Head-Lease)',
    text: 'fixed weekly rent, zero vacancy risk.',
    icon: <FiHome />,
  },
  {
    title: 'Management Agreement',
    text: 'performance-based income with full end-to-end management.',
    icon: <FiBarChart2 />,
  },
];

const PROTECTION = [
  {
    title: '2-Night Minimum Stays',
    text: 'Prevents quick party-style bookings and encourages genuine travelers.',
    icon: <FiShield />,
  },
  {
    title: 'Noise Monitoring',
    text: 'Smart decibel meters alert us to disturbances early so we can act fast.',
    icon: <FiCheckCircle />,
  },
  {
    title: 'Guest Screening',
    text: 'Every booking is ID-verified and cross-checked through trusted platforms.',
    icon: <FiUsers />,
  },
  {
    title: 'Insurance & Compliance',
    text: 'Full coverage plus council and strata-friendly practices.',
    icon: <FiFileText />,
  },
];

const TAGS = [
  'Setup & Styling',
  'Listings & Pricing',
  'Guest Screening',
  'Hotel-grade Cleaning',
  'Monthly Statements',
];

const VALUES = [
  {
    title: 'Transparency',
    text: 'Clear reports, itemised statements, and open-book communication.',
  },
  {
    title: 'Consistency',
    text: 'Standardised operations that deliver repeatable, reliable outcomes.',
  },
  {
    title: 'Protection',
    text: 'Screened guests, 2 night, and proactive property care.',
  },
];

const SECTION_WRAP = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const SECTION_ITEM = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <main className="about-page" aria-labelledby="about-title">
      <section className="about-band about-band--light about-band--top">
        <div className="about-shell">
          <div className="about-section-head">
            <p className="about-eyebrow">Where We Are Today</p>
            <h1 id="about-title">Professional hosting, owner-first reporting.</h1>
            <p>
              We’re a Sydney-based short-stay operator focused on{' '}
              <strong>clean</strong>, <strong>reliable</strong>, and{' '}
              <strong>compliance-first</strong> hosting. Our mission is simple:
              treat your property like a professional asset, deliver consistent,
              predictable returns, and protect your long-term value with
              transparent reporting and world-class operations.
            </p>
          </div>

          <div className="about-feature-grid">
            <Motion.article
              className="about-feature-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
            >
              <div className="about-card-head">
                <span className="about-card-mark">01</span>
                <h3>What We Do</h3>
              </div>
              <div className="about-service-list">
                {SERVICES.map(({ title, text, icon }) => (
                  <div className="about-service" key={title}>
                    <span className="about-service__icon" aria-hidden="true">
                      {icon}
                    </span>
                    <p>
                      <strong>{title}</strong> - {text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="about-tags" aria-label="Services">
                {TAGS.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Motion.article>

            <Motion.article
              className="about-feature-card about-feature-card--accent"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <div className="about-card-head">
                <span className="about-card-mark">02</span>
                <h3>How Do We Protect Your Property</h3>
              </div>
              <div className="about-protection-list">
                {PROTECTION.map(({ title, text, icon }) => (
                  <div className="about-protection" key={title}>
                    <span className="about-protection__icon" aria-hidden="true">
                      {icon}
                    </span>
                    <p>
                      <strong>{title}:</strong> {text}
                    </p>
                  </div>
                ))}
              </div>
            </Motion.article>
          </div>

          <div className="about-values-grid">
            {VALUES.map((value) => (
              <Motion.article
                className="about-value-card"
                key={value.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
              >
                <span aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>

      <Motion.section
        className="about-hero"
        variants={SECTION_WRAP}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="about-shell about-hero__grid">
          <div className="about-hero__intro">
            <Motion.p className="about-eyebrow" variants={SECTION_ITEM}>
              Built for Property Owners
            </Motion.p>
            <Motion.h2 variants={SECTION_ITEM}>
              More visibility. Less day-to-day work.
            </Motion.h2>
          </div>

          <Motion.div className="about-owner-card" variants={SECTION_ITEM}>
            <h2>What You Can Expect</h2>
            <p>
              We handle guest communication, pricing, cleaning coordination and
              property checks, so you are not pulled into the daily demands of
              short-stay hosting.
            </p>
            <p>
              You receive clear statements and straightforward updates, giving
              you an accurate view of performance without having to chase for
              information.
            </p>
            <p>
              Your property is supported by consistent operating standards,
              proactive issue management and a team accountable for protecting
              its condition and long-term value.
            </p>
          </Motion.div>
        </div>
      </Motion.section>
    </main>
  );
}
