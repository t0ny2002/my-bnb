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

  const storyWrap = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const storyItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="about-container">
      {/* ---------- Our Story ---------- */}
      <motion.section
        className="our-story"
        id="story"
        aria-labelledby="story-heading"
        variants={storyWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          id="story-heading"
          className="section-title-2 story-heading"
          variants={storyItem}
        >
          Our Story
        </motion.h2>

        <motion.p variants={storyItem}>
          Crownstone Quarters began in 2022 when Tony leased out his apartment
          in Zetland while travelling overseas. What started as a simple
          handover quickly revealed the real challenges of short-stay
          hosting—late-night guest messages, back-to-back turnovers, and keeping
          a home in top condition.
        </motion.p>

        <motion.p variants={storyItem}>
          Edwin stepped in to bring structure to operations—compliance,
          screening and clear reporting—while Eden focused on guest care and
          communications. We learned that with the right systems and a personal
          touch, hosting becomes seamless for everyone involved.
        </motion.p>

        <motion.p variants={storyItem}>
          That’s the approach we carry into every property today: calm
          operations, clear communication and consistently great stays.
        </motion.p>
      </motion.section>
      {/* ---------- /Our Story ---------- */}
      {/* Hero Heading */}
      <section className="band">
        <motion.h1
          className="about-title"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Where We Are Today
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
          <span className="highlight">compliance-first</span> hosting. Our
          mission is simple: treat your property like a professional asset,
          deliver consistent, predictable returns, and protect your long-term
          value with transparent reporting and world-class operations.
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
                <strong>Guaranteed Rent (Head-Lease)</strong> — fixed weekly
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
            <h3>How Do We Protect Your Property</h3>
            <ul>
              <li>
                <strong>2-Night Minimum Stays:</strong> Prevents quick
                party-style bookings and encourages genuine travelers.
              </li>
              <li>
                <strong>Noise Monitoring:</strong> Smart decibel meters alert us
                to disturbances early so we can act fast.
              </li>
              <li>
                <strong>Guest Screening:</strong> Every booking is ID-verified
                and cross-checked through trusted platforms.
              </li>
              <li>
                <strong>Insurance & Compliance:</strong> Full coverage plus
                council and strata-friendly practices.
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
      </section>

      {/* ---------- Our Team (simple, drop-in) ---------- */}
      <section
        className="teamSimple band"
        id="team"
        aria-labelledby="team-heading"
      >
        <h2 id="team-heading" className="section-title-2">
          Our Team
        </h2>
        <p className="teamSimple__lead">
          Accommodation operations are all run by our crew:
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
