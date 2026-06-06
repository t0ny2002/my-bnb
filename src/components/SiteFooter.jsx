import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import './SiteFooter.css';

const NAV_LINKS = [
  ['About Us', '/about'],
  ['How it Works', '/how'],
  ['Our Portfolio', '/portfolio'],
  ['Contact', '/contact'],
];

const SERVICES = [
  'Guaranteed Rent',
  'Short-stay Management',
  'Guest Screening',
  'Owner Reporting',
];

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="footer-title">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label="Go home">
            <img src="/footer-logo.png" alt="" />
          </Link>
          <p id="footer-title">
            Calm, compliance-first Airbnb management for Sydney property
            owners.
          </p>
          <Link className="site-footer__primary" to="/contact">
            Get an Appraisal
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <nav className="site-footer__group" aria-label="Footer navigation">
          <h2>Navigate</h2>
          <ul>
            {NAV_LINKS.map(([label, to]) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__group">
          <h2>Services</h2>
          <ul>
            {SERVICES.map((service) => (
              <li key={service}>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <address className="site-footer__contact">
          <h2>Contact Us</h2>
          <a href="tel:+61449537675">
            <FiPhone aria-hidden="true" />
            <span>0449 537 675</span>
          </a>
          <a href="mailto:properties@crownstonequarters.com">
            <FiMail aria-hidden="true" />
            <span>properties@crownstonequarters.com</span>
          </a>
          <p>
            <FiMapPin aria-hidden="true" />
            <span>Sydney, NSW</span>
          </p>
        </address>
      </div>

      <div className="site-footer__bar">
        <p>© {year} Crownstone Quarters. All rights reserved.</p>
      </div>
    </footer>
  );
}
