import { NavLink, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import HowItWorks from '../pages/HowItWorks';

export default function Navbar() {
  return (
    <div>
      <header className="nav">
        <div className="nav__left">
          <Link to="/" className="logoLink" aria-label="Go to homepage">
            <img src="/logo-mark.png" alt="" className="logoMark" />
          </Link>
          <Link to="/" className="brand">
            Blackstone Quarters
          </Link>
        </div>

        <nav className="nav__center">
          <NavLink to="/about" className="nav__link">
            About Us
          </NavLink>
          <NavLink to="/how" className="nav__link">
            How it Works
          </NavLink>
          <NavLink to="/contact" className="nav__link">
            Contact
          </NavLink>
        </nav>

        <div className="nav__right">
          <a
            className="btn btn--ghost small"
            href="mailto:properties@blackstonequarters.com"
          >
            properties@blackstonequarters.com
          </a>
          <Link className="btn small" to="/about">
            Get an Appraisal
          </Link>
        </div>
      </header>
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<HowItWorks />} />
        {/* Add this later if you split Contact into a page */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}
