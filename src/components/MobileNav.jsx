import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNav.css';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const loc = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  // Lock scroll + ESC + outside click
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);

    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClickOutside = (e) => {
      if (!open) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onClickOutside);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onClickOutside);
    };
  }, [open]);

  return (
    <nav className="mnav" aria-label="Primary">
      {/* Brand / left side */}
      <Link to="/" className="mnav__brand">
        Crownstone Quarters
      </Link>

      {/* Hamburger */}
      <button
        className={`hamburger ${open ? 'is-active' : ''}`}
        aria-label="Open menu"
        aria-controls="mobile-drawer"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Scrim */}
      <div className={`mnav__scrim ${open ? 'is-visible' : ''}`} />

      {/* Drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`mnav__drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <ul className="mnav__list">
          <li>
            <Link to="/" className="mnav__link">
              Home
            </Link>
          </li>
          <li>
            <a href="/#why" className="mnav__link">
              Why us
            </a>
          </li>
          <li>
            <a href="/#how" className="mnav__link">
              How it works
            </a>
          </li>
          <li>
            <Link to="/contact" className="mnav__link">
              Contact
            </Link>
          </li>
          {/* add more as needed */}
        </ul>
        <div className="mnav__cta">
          <Link to="/contact" className="btn btn-primary">
            Free Appraisal
          </Link>
        </div>
      </div>
    </nav>
  );
}
