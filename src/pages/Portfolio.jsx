import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingModal from '../components/BookingModal';
import './Portfolio.css';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';

export default function Portfolio() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const portfolio = [
    {
      id: 'pyrmont',
      img: '/pyrmont-murray-st.jpeg',
      alt: 'Sunlit living room with balcony in Pyrmont',
      address: '261 Harris Street, Pyrmont NSW',
      alias: 'Harbourside Hideaway',
      bedrooms: 2,
      bathrooms: 2,
      carports: 1,
      cleaningFee: 140,
      maxGuests: 4,
    },
    {
      id: 'pyrmont-2',
      img: '/pyrmont-murray-st-2.jpg',
      alt: 'Modern Pyrmont apartment overlooking Darling Harbour',
      address: '38 York St, Sydney',
      alias: 'Urban Horizon Suite',
      bedrooms: 2,
      bathrooms: 2,
      carports: 0,
      cleaningFee: 120,
      maxGuests: 3,
    },
    {
      id: 'pyrmont-3',
      img: '/pyrmont-pyrmont-st.jpg',
      alt: 'Stylish Pyrmont studio with skyline views',
      address: '243 Pyrmont Street, Pyrmont NSW',
      alias: 'Skyline Retreat',
      bedrooms: 1,
      bathrooms: 1,
      carports: 0,
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

              <figcaption className="portfolio-caption">
                <div className="portfolio-address">{p.address}</div>
                <div className="portfolio-alias">{p.alias}</div>
              </figcaption>

              <dl
                className="portfolio-amenities"
                aria-label="Property amenities"
              >
                <div className="amenity">
                  <dt className="amenity-label">Bedrooms</dt>
                  <dd className="amenity-value">
                    <FaBed className="amenity-icon" />
                    {p.bedrooms}
                  </dd>
                </div>
                <div className="amenity">
                  <dt className="amenity-label">Bathrooms</dt>
                  <dd className="amenity-value">
                    <FaBath className="amenity-icon" />
                    {p.bathrooms}
                  </dd>
                </div>
                <div className="amenity">
                  <dt className="amenity-label">Carports</dt>
                  <dd className="amenity-value">
                    <FaCar className="amenity-icon" />
                    {p.carports}
                  </dd>
                </div>
              </dl>

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
