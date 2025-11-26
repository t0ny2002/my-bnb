// src/components/Navbar.jsx
import { NavLink, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Home from '../pages/Home';
import About from '../pages/About';
import HowItWorks from '../pages/HowItWorks';
import Contact from '../pages/Contact';
import Portfolio from '../pages/Portfolio';

export default function Navbar() {
  // Mobile drawer state
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const loc = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isFirstLoad = useRef(true);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);

    return () => clearTimeout(timer);
  }, [loc.pathname]);

  // Lock scroll + ESC + outside click
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onOutside = (e) => {
      if (!open) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target))
        setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onOutside);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onOutside);
    };
  }, [open]);

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p className="loading-text">Loading</p>
        </div>
      )}

      <header className="nav">
        <div className="nav__left">
          <Link to="/" className="logoLink" aria-label="Go to homepage">
            <img src="/logo-mark.png" alt="" className="logoMark" />
          </Link>
        </div>

        {/* Desktop center links */}
        <nav className="nav__center">
          <NavLink to="/about" className="nav__link">
            About Us
          </NavLink>
          <NavLink to="/how" className="nav__link">
            How it Works
          </NavLink>
          <NavLink to="/portfolio" className="nav__link">
            Our Portfolio
          </NavLink>
          <NavLink to="/contact" className="nav__link">
            Contact
          </NavLink>
        </nav>

        {/* Desktop CTA */}
        <div className="nav__right">
          <Link
            class="btn small appraisal-button"
            className="btn small"
            to="/contact"
          >
            Get an Appraisal
          </Link>
        </div>

        {/* Mobile hamburger (hidden on desktop via CSS) */}
        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          aria-label="Toggle menu"
          aria-controls="mobile-drawer"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile scrim + drawer */}
      <div className={`mnav__scrim ${open ? 'is-visible' : ''}`} />
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`mnav__drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <ul className="mnav__list">
          <li>
            <NavLink to="/about" className="mnav__link">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/how" className="mnav__link">
              How it Works
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className="mnav__link">
              Our Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="mnav__link">
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="mnav__cta">
          <Link to="/contact" className="btn btn-primary">
            Free Appraisal
          </Link>
        </div>
      </aside>

      {/* ROUTES (kept as you had them) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}
