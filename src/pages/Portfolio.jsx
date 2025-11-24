import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingModal from '../components/BookingModal';
import './Portfolio.css';

export default function Portfolio() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const portfolio = [
    {
      id: 'pyrmont',
      img: '/pyrmont-murray-st.jpg',
      address: '109/50 Murray St, Pyrmont NSW',
      nightlyRate: 320,
      cleaningFee: 140,
      maxGuests: 4,
    },
    {
      id: 'pyrmont-2',
      img: '/pyrmont-murray-st-2.jpg',
      address: '350/50 Murray St, Pyrmont NSW',
      nightlyRate: 290,
      cleaningFee: 120,
      maxGuests: 3,
    },
    {
      id: 'pyrmont-3',
      img: '/pyrmont-pyrmont-st.jpg',
      address: '1139/243 Pyrmont Street, Pyrmont NSW',
      nightlyRate: 260,
      cleaningFee: 110,
      maxGuests: 2,
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
    <>
      <motion.section
        id="portfolio"
        className="portfolio band"
        aria-labelledby="portfolio-heading"
        variants={listAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 id="portfolio-heading" className="section-title-2">
          Our Portfolio
        </h2>

        <motion.div className="portfolio-grid" variants={listAnim}>
          {portfolio.map((p) => (
            <motion.figure
              key={p.id}
              className="portfolio-card"
              variants={itemAnim}
              whileHover={{ y: -4 }}
            >
              <img
                className="portfolio-img"
                src={p.img}
                alt={p.alt}
                loading="lazy"
              />

              <figcaption className="portfolio-caption">{p.address}</figcaption>

              <button
                className="portfolio-book-btn"
                onClick={() => setSelectedProperty(p)}
              >
                Request Booking
              </button>
            </motion.figure>
          ))}
        </motion.div>
      </motion.section>

      {selectedProperty && (
        <BookingModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
}
