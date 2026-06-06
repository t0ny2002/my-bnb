import { memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaBath, FaBed, FaCar } from 'react-icons/fa';
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiUsers,
} from 'react-icons/fi';
import BookingModal from '../components/BookingModal';
import './Portfolio.css';

const PORTFOLIO = [
  {
    id: 'pyrmont',
    images: [
      '/portfolio/243-pyrmont-1.jpg',
      '/portfolio/243-pyrmont-2.jpg',
      '/portfolio/243-pyrmont-3.jpg',
    ],
    address: '243 Pyrmont Street, Pyrmont NSW',
    alias: 'Harbourside Hideaway',
    bedrooms: 1,
    bathrooms: 1,
    carports: 0,
    cleaningFee: 140,
    maxGuests: 4,
    profile: 'Harbourside apartment tuned for calm, polished short stays.',
    highlight: 'Harbour-side',
  },
  {
    id: 'pyrmont-2',
    images: [
      '/portfolio/38-york-1.jpg',
      '/portfolio/38-york-2.jpg',
      '/portfolio/38-york-3.jpg',
    ],
    address: '38 York St, Sydney NSW',
    alias: 'Urban Horizon Suite',
    bedrooms: 2,
    bathrooms: 2,
    carports: 0,
    cleaningFee: 120,
    maxGuests: 6,
    profile:
      'CBD-facing suite with amenity-led appeal and strong group demand.',
    highlight: 'CBD location',
  },
  {
    id: 'pyrmont-3',
    images: [
      '/portfolio/261-harris-1.jpg',
      '/portfolio/261-harris-2.jpg',
      '/portfolio/261-harris-3.jpg',
    ],
    address: '261 Harris St, Pyrmont NSW',
    alias: 'Skyline Retreat',
    bedrooms: 1,
    bathrooms: 1,
    carports: 0,
    cleaningFee: 110,
    maxGuests: 2,
    profile:
      'Light-filled stay with city outlooks and an efficient guest setup.',
    highlight: 'Skyline outlook',
  },
];

const SUMMARY = [
  ['3', 'Managed stays'],
  ['100%', 'Guest-ready'],
  ['2', 'Airbnb Hosts'],
  ['1', 'Superhost'],
];

const AMENITY_ICONS = {
  bedrooms: FaBed,
  bathrooms: FaBath,
  carports: FaCar,
};

const PortfolioCard = memo(function PortfolioCard({
  property,
  index,
  onRequestBooking,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = property.images.length;
  const activeImage = property.images[activeSlide];

  const goToSlide = useCallback(
    (nextIndex) => {
      setActiveSlide((nextIndex + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const handlePrev = useCallback(
    () => goToSlide(activeSlide - 1),
    [activeSlide, goToSlide]
  );

  const handleNext = useCallback(
    () => goToSlide(activeSlide + 1),
    [activeSlide, goToSlide]
  );

  const handleRequest = useCallback(
    () => onRequestBooking(property),
    [onRequestBooking, property]
  );

  return (
    <article className="portfolio-card">
      <div className="portfolio-card__media">
        <img
          src={activeImage}
          alt={`${property.alias} at ${property.address}`}
          className="portfolio-card__image"
          width="1400"
          height="875"
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />

        <span className="portfolio-card__badge">{property.highlight}</span>

        <div className="portfolio-card__controls">
          <button
            type="button"
            className="portfolio-card__nav"
            onClick={handlePrev}
            aria-label={`Previous image for ${property.alias}`}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="portfolio-card__nav"
            onClick={handleNext}
            aria-label={`Next image for ${property.alias}`}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="portfolio-card__dots" aria-label="Gallery position">
          {property.images.map((image, dotIndex) => (
            <button
              key={image}
              type="button"
              className={`portfolio-card__dot${
                dotIndex === activeSlide ? ' is-active' : ''
              }`}
              onClick={() => goToSlide(dotIndex)}
              aria-label={`Show image ${dotIndex + 1} for ${property.alias}`}
              aria-pressed={dotIndex === activeSlide}
            />
          ))}
        </div>
      </div>

      <div className="portfolio-card__body">
        <div>
          <p className="portfolio-card__kicker">
            <FiMapPin aria-hidden="true" />
            {property.address}
          </p>
          <h2>{property.alias}</h2>
          <p>{property.profile}</p>
        </div>

        <dl className="portfolio-card__amenities" aria-label="Property details">
          {[
            ['bedrooms', property.bedrooms, 'Bedrooms'],
            ['bathrooms', property.bathrooms, 'Bathrooms'],
            ['carports', property.carports, 'Car spaces'],
          ].map(([key, value, label]) => {
            const Icon = AMENITY_ICONS[key];
            return (
              <div className="portfolio-card__amenity" key={key}>
                <dt>{label}</dt>
                <dd>
                  <Icon aria-hidden="true" />
                  {value}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="portfolio-card__meta">
          <span>
            <FiUsers aria-hidden="true" />
            Up to {property.maxGuests} guests
          </span>
        </div>

        <button
          type="button"
          className="portfolio-card__cta"
          onClick={handleRequest}
        >
          Request Booking
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});

export default function Portfolio() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const handleRequestBooking = useCallback((property) => {
    setSelectedProperty(property);
  }, []);

  const handleClose = useCallback(() => setSelectedProperty(null), []);

  return (
    <>
      <main className="portfolio-page" aria-labelledby="portfolio-heading">
        <section className="portfolio-hero">
          <div className="portfolio-shell portfolio-hero__grid">
            <div className="portfolio-hero__copy">
              <p className="portfolio-eyebrow">Crownstone Quarters portfolio</p>
              <h1 id="portfolio-heading">
                Managed homes with hotel-grade polish.
              </h1>
              <p>
                A tighter look at the short-stay properties we operate across
                Sydney, with sharp presentation, practical property facts, and a
                clear path to enquiry.
              </p>
            </div>

            <div
              className="portfolio-hero__panel"
              aria-label="Portfolio summary"
            >
              {SUMMARY.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-list" aria-label="Available properties">
          <div className="portfolio-shell">
            <div className="portfolio-list__header">
              <div>
                <p className="portfolio-eyebrow">Current stays</p>
                <h2>Our Portfolio</h2>
              </div>
              <p>Curated homes and calm guest-ready presentation.</p>
            </div>

            <div className="portfolio-grid">
              {PORTFOLIO.map((property, index) => (
                <PortfolioCard
                  key={property.id}
                  property={property}
                  index={index}
                  onRequestBooking={handleRequestBooking}
                />
              ))}
            </div>

            <aside className="portfolio-note">
              <FiArrowRight aria-hidden="true" />
              <span>
                Every property is prepared for short-stay comfort, guest
                screening, and straightforward booking enquiries.
              </span>
            </aside>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProperty && (
          <BookingModal
            key={selectedProperty.id}
            property={selectedProperty}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
