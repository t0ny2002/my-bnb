// src/pages/About.jsx
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  const team = [
    {
      id: 'alex',
      name: 'Tony Ding',
      role: 'Operations & Guest Experience',
      img: '/tony.jpg',
    },
    {
      id: 'jamie',
      name: 'Edwin Huang',
      role: 'Compliance & Reporting',
      img: '/edwin.jpeg',
    },
    {
      id: 'sam',
      name: 'Eden Lin',
      role: 'Owners & Parternships',
      img: '/default.jpg',
    },
  ];

  const listAnim = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemAnim = {
    hidden: { y: 14, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="about-container">
      {/* Hero Heading */}
      <motion.h1
        className="about-title"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        About Crownstone Quarters
      </motion.h1>

      {/* Mission */}
      <motion.p
        className="about-mission"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        We’re a Sydney-based short-stay operator focused on{' '}
        <span className="highlight">clean</span>,{' '}
        <span className="highlight">reliable</span>, and{' '}
        <span className="highlight">compliance-first</span> hosting. Our mission
        is simple: treat your property like a professional asset, deliver
        consistent, predictable returns, and protect your long-term value with
        transparent reporting and world-class operations.
      </motion.p>

      {/* Cards Section */}
      <div className="about-cards">
        <motion.div
          className="about-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>What We Do</h3>
          <ul>
            <li>
              <strong>Guaranteed Rent (Head-Lease)</strong> — fixed monthly
              rent, zero vacancy risk.
            </li>
            <li>
              <strong>Management Agreement</strong> — performance-based income
              with full end-to-end management.
            </li>
          </ul>
          <div className="tags">
            <span>Setup & Styling</span>
            <span>Listings & Pricing</span>
            <span>Guest Screening</span>
            <span>Hotel-grade Cleaning</span>
            <span>Monthly Statements</span>
          </div>
        </motion.div>

        <motion.div
          className="about-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>How We Operate</h3>
          <ul>
            <li>
              <strong>Compliance-first:</strong> strata & council awareness,
              upfront disclosure.
            </li>
            <li>
              <strong>Smart calendars:</strong> planning around local caps to
              protect yield.
            </li>
            <li>
              <strong>No-party policy:</strong> strict verification &
              monitoring.
            </li>
            <li>
              <strong>Owner-first:</strong> transparent comms and predictable
              payouts.
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Values Grid */}
      <div className="values-grid">
        {[
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
            text: 'Screened guests, security deposits, and proactive property care.',
          },
        ].map((val, idx) => (
          <motion.div
            key={idx}
            className="value-card"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <h4>{val.title}</h4>
            <p>{val.text}</p>
          </motion.div>
        ))}
      </div>

      {/* ---------- Our Team (simple, drop-in) ---------- */}
      <section className="teamSimple" id="team" aria-labelledby="team-heading">
        <h2 id="team-heading" className="section-title-2">
          Our Team
        </h2>
        <p className="teamSimple__lead">
          Accommodation operations run by our crew.
        </p>

        <motion.div
          className="teamSimple__grid"
          variants={listAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {team.map((m, i) => (
            <motion.article
              key={m.id}
              className="teamSimple__card"
              variants={itemAnim}
            >
              <img
                src={m.img}
                alt={m.name}
                className="teamSimple__img"
                loading="lazy"
              />
              <h3 className="teamSimple__name">{m.name}</h3>
              <p className="teamSimple__role">{m.role}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
      {/* ---------- /Our Team ---------- */}
    </section>
  );
}
