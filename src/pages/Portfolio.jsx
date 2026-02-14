import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';
import BookingModal from '../components/BookingModal';
import './Portfolio.css';

const listAnim = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemAnim = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

function PortfolioCard({ property, onRequestBooking }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = property.images.length;

  const goToSlide = (index) => {
    const nextIndex = (index + totalSlides) % totalSlides;
    setActiveSlide(nextIndex);
  };

  const handlePrev = () => goToSlide(activeSlide - 1);
  const handleNext = () => goToSlide(activeSlide + 1);

  return (
    <motion.figure
      className="portfolio-card"
      variants={itemAnim}
      whileHover={{ y: -4 }}
    >
      <div className="portfolio-slideshow" aria-live="polite">
        <img
          className="portfolio-slide-img"
          src={property.images[activeSlide]}
          alt={`${property.alias} placeholder slide ${activeSlide + 1}`}
          loading="lazy"
        />
        <div className="portfolio-slide-controls">
          <button
            type="button"
            className="portfolio-slide-btn"
            onClick={handlePrev}
            aria-label="View previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="portfolio-slide-btn"
            onClick={handleNext}
            aria-label="View next slide"
          >
            ›
          </button>
        </div>
        <div className="portfolio-slide-dots" role="tablist">
          {property.images.map((_, index) => (
            <button
              key={`${property.id}-slide-${index}`}
              type="button"
              className={`portfolio-slide-dot${
                index === activeSlide ? ' is-active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>
      </div>

      <figcaption className="portfolio-caption">
        <div className="portfolio-address">{property.address}</div>
        <div className="portfolio-alias">{property.alias}</div>
      </figcaption>

      <dl className="portfolio-amenities" aria-label="Property amenities">
        <div className="amenity">
          <dt className="amenity-label">Bedrooms</dt>
          <dd className="amenity-value">
            <FaBed className="amenity-icon" />
            {property.bedrooms}
          </dd>
        </div>
        <div className="amenity">
          <dt className="amenity-label">Bathrooms</dt>
          <dd className="amenity-value">
            <FaBath className="amenity-icon" />
            {property.bathrooms}
          </dd>
        </div>
        <div className="amenity">
          <dt className="amenity-label">Carports</dt>
          <dd className="amenity-value">
            <FaCar className="amenity-icon" />
            {property.carports}
          </dd>
        </div>
      </dl>

      <button
        className="portfolio-book-btn"
        onClick={() => onRequestBooking(property)}
      >
        Request Booking
      </button>
    </motion.figure>
  );
}

export default function Portfolio() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const portfolio = [
    {
      id: 'pyrmont',
      images: [
        '/243-Pyrmont-St-pic.png',
        '/243-Pyrmont-St-pic-2.png',
        '/243-Pyrmont-St-pic-3.JPG',
      ],
      address: '243 Pyrmont Street, Pyrmont NSW',
      alias: 'Harbourside Hideaway',
      bedrooms: 1,
      bathrooms: 1,
      carports: 0,
      cleaningFee: 140,
      maxGuests: 4,
    },
    {
      id: 'pyrmont-2',
      images: [
        '/38-york-st-2.png',
        '/pyrmont-murray-st-2.jpg',
        '/38-york-st-3.png',
      ],
      address: '38 York St, Sydney',
      alias: 'Urban Horizon Suite',
      bedrooms: 2,
      bathrooms: 2,
      carports: 0,
      cleaningFee: 120,
      maxGuests: 6,
    },
    {
      id: 'pyrmont-3',
      images: [
        '/50-murray-st-1.png',
        '/50-murray-st-2.png',
        '/50-murray-st-3.png',
      ],
      address: '50 Murray Street, Pyrmont NSW',
      alias: 'Skyline Retreat',
      bedrooms: 1,
      bathrooms: 1,
      carports: 0,
      cleaningFee: 110,
      maxGuests: 2,
    },
  ];

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
            <PortfolioCard
              key={p.id}
              property={p}
              onRequestBooking={setSelectedProperty}
            />
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
