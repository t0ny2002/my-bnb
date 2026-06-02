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

const TEAM = [
  {
    id: 'alex',
    name: 'Tony Ding',
    role: 'Operations & Guest Experience',
    img: '/tony.jpg',
  },
  {
    id: 'sam',
    name: 'Eden Lin',
    role: 'Owners & Partnerships',
    img: '/eden.jpg',
  },
];

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

const STORY_WRAP = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const STORY_ITEM = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const LIST_ANIM = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const ITEM_ANIM = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function About() {
  return (
    <main className="about-page" aria-labelledby="about-title">
      <Motion.section
        className="about-hero"
        variants={STORY_WRAP}
        initial="hidden"
        animate="show"
      >
        <div className="about-shell about-hero__grid">
          <div className="about-hero__intro">
            <Motion.p className="about-eyebrow" variants={STORY_ITEM}>
              About Crownstone Quarters
            </Motion.p>
            <Motion.h1 id="about-title" variants={STORY_ITEM}>
              Calm operations for short-stay homes.
            </Motion.h1>
          </div>

          <Motion.div className="about-story-card" variants={STORY_ITEM}>
            <h2>Our Story</h2>
            <p>
              Crownstone Quarters began in 2022 when Tony leased out his
              apartment in Zetland while travelling overseas. What started as a
              simple handover quickly revealed the real challenges of short-stay
              hosting—late-night guest messages, back-to-back turnovers, and
              keeping a home in top condition.
            </p>
            <p>
              Tony stepped in to bring structure to operations—compliance,
              screening and clear reporting—while Eden focused on guest care and
              communications. We learned that with the right systems and a
              personal touch, hosting becomes seamless for everyone involved.
            </p>
            <p>
              That’s the approach we carry into every property today: calm
              operations, clear communication and consistently great stays.
            </p>
          </Motion.div>
        </div>
      </Motion.section>

      <section className="about-band about-band--light">
        <div className="about-shell">
          <div className="about-section-head">
            <p className="about-eyebrow">Where We Are Today</p>
            <h2>Professional hosting, owner-first reporting.</h2>
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
                      <strong>{title}</strong> — {text}
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

      <section
        className="about-band about-band--team"
        id="team"
        aria-labelledby="team-heading"
      >
        <div className="about-shell">
          <div className="about-section-head about-section-head--team">
            <p className="about-eyebrow">Our Team</p>
            <h2 id="team-heading">
              Accommodation operations are all run by our crew.
            </h2>
          </div>

          <Motion.div
            className="about-team-grid"
            variants={LIST_ANIM}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TEAM.map((member) => (
              <Motion.article
                key={member.id}
                className="about-team-card"
                variants={ITEM_ANIM}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="about-team-card__img"
                  loading="lazy"
                />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </Motion.article>
            ))}
          </Motion.div>
        </div>
      </section>
    </main>
  );
}
