import { useState } from "react";
import "./App.css";

export default function App() {
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! We’ll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const badges = [
    { label: "Guaranteed Rent*", detail: "On-time payment, every month" },
    { label: "Professional Cleaning", detail: "Hotel-grade turnover" },
    { label: "24/7 Guest Support", detail: "We handle everything" },
    { label: "Damage Protection", detail: "with insurer-backed cover (subject to policy terms)" },
  ];

  const steps = [
    { title: "1) Property Walkthrough", body: "We inspect and assess earning potential, strata/LEP rules, and fit-out needs." },
    { title: "2) Simple Agreement", body: "Fixed-term lease or management agreement; clearly defines responsibilities and inclusions." },
    { title: "3) Setup & Styling", body: "We furnish, photograph, and create listings with dynamic pricing & guest screening." },
    { title: "4) Fully Managed", body: "Cleaning, linen, amenities, check-ins, maintenance triage, reporting to you monthly." },
  ];

  const faqs = [
    { q: "Is this subletting legal?", a: "We only operate where the lease and strata by-laws allow it. We disclose our use up-front and can work under either (a) a head-lease with written consent to sublet/short-stay or (b) a property management agreement." },
    { q: "How do you protect the property?", a: "ID verification, deposit where appropriate, noise & party monitoring, professional cleaning/inspection, and rapid response. We maintain a guest blacklist across platforms." },
    { q: "Who pays for utilities and wear-and-tear?", a: "Typically we cover utilities and minor consumables during the term. Any custom arrangement can be written into the agreement." },
    { q: "Do I get paid if occupancy is low?", a: "Under a 'Guaranteed Rent' head-lease, you’re paid a fixed amount regardless of occupancy. Under a management agreement, you receive a share of revenue minus operating costs—your choice." },
  ];

  const comingSoon = [
    { id: 1, title: "Modern 1BR • Parramatta", tag: "Coming Soon", image: "/aussiehouse1.jpg" },
    { id: 2, title: "Garden Studio • Newtown", tag: "Under Review", image: "/aussiehouse1.jpg" },
    { id: 3, title: "Harbour View • Kirribilli", tag: "Owner Onboarded", image: "/aussiehouse1.jpg" },
  ];

  return (
    <div className="site">
      {/* NAV */}
      <header className="nav">
      <div className="nav__left">
        <a href="#top" className="brand-link">
          <img src="/logo-mark.png" alt="Logo" className="logoMark" />
          <span className="brand">Blackstone Quarters</span>
        </a>
      </div>
        <nav className="nav__center">
          <a href="#owners" className="nav__link">For Owners & Agents</a>
          <a href="#how" className="nav__link">How it Works</a>
          <a href="#compliance" className="nav__link">Compliance</a>
          <a href="#contact" className="nav__link">Contact</a>
        </nav>
        <div className="nav__right">
          <a className="btn btn--ghost small" href="mailto:parternships@blackstonequarters.com">parternships@blackstonequarters.com</a>
          <a className="btn small" href="#contact">Get an Appraisal</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero ownerHero">
        <img src="/aussiehouse1.jpeg" alt="Home exterior" className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1>Professional short-stay management for your property</h1>
          <p className="lead">
            Guaranteed rent options or performance-based management. We handle
            setup, cleaning, pricing, guests, and reporting—end to end.
          </p>
          <div className="heroActions">
            <a href="#contact" className="btn btn--primary">Request a Free Appraisal</a>
            <a href="#how" className="btn btn--ghost">See How it Works</a>
          </div>

          <div className="trustbar">
            {badges.map((b, i) => (
              <div key={i} className="trustItem">
                <div className="dot"></div>
                <div>
                  <div className="trustTitle">{b.label}</div>
                  <div className="trustDetail">{b.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section id="owners" className="section alt">
        <div className="container">
          <h2 className="section-title-2">Why partner with Blackstone Quarters?</h2>
          <div className="cards3">
            <article className="vcard">
              <div className="vicon" />
              <h3>Guaranteed Rent*</h3>
              <p>Fixed, on-time payments under a head-lease—no vacancy risk for you.</p>
            </article>
            <article className="vcard">
              <div className="vicon" />
              <h3>Hotel-Grade Operations</h3>
              <p>Pro cleaning, linen service, restocking, maintenance triage, and 24/7 guest support.</p>
            </article>
            <article className="vcard">
              <div className="vicon" />
              <h3>Compliance-First</h3>
              <p>Up-front disclosure, strata awareness, and calendar planning around local caps.</p>
            </article>
          </div>
          <p className="muted-dark smallNote">
            *Guaranteed rent is subject to property inspection, agreement terms, and local regulations.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section alt-2">
        <div className="container">
          <h2 className="section-title-2">How it works</h2>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={i} className="step">
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section id="compliance" className="section alt">
        <div className="container">
          <h2 className="section-title-2">Compliance & Assurance</h2>
          <div className="assurance">
            <div className="assuranceItem">
              <h4>Transparent Use</h4>
              <p>We disclose intended short-stay use to owners/agents and obtain written consent where required.</p>
            </div>
            <div className="assuranceItem">
              <h4>Strata & Council</h4>
              <p>We respect strata by-laws and local rules. NSW non-hosted lets are capped at 180 nights in greater Sydney—our calendars adapt, or we pivot to mid-term stays.</p>
            </div>
            <div className="assuranceItem">
              <h4>Guest Screening</h4>
              <p>Verification, watch-lists, noise policies, and clear house rules. We operate a no-party stance.</p>
            </div>
            <div className="assuranceItem">
              <h4>Protection</h4>
              <p>Damage protection and bond options available; routine inspections after turnovers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section alt-2">
        <div className="container">
          <h2 className="section-title-2">FAQs</h2>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={i} className="faqRow">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container contactGrid">
          {/* LEFT: form card */}
          <div className="contactPanel">
            <h2 className="section-title">Request a free appraisal</h2>
            <p className="muted">
              Send through your property address and ideal start date. We’ll reply with
              projected nightly rates, seasonality, and the best agreement type for you.
            </p>

            <form className="contactForm" onSubmit={handleSubmit}   action="https://formspree.io/f/meolzrga" method="POST">
              <div className="row">
                <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
              </div>
              <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
              <textarea name="message" placeholder="Property address + notes" rows="4" value={form.message} onChange={handleChange} required />
              <button className="btn btn--primary" type="submit">Send</button>
            </form>

            <div className="contactAlt">
              Or email us: <a href="mailto:parternships@blackstonequarters.com">parternships@blackstonequarters.com</a>
            </div>
          </div>

          {/* RIGHT: about card */}
          <aside className="contactCard">
            <div className="miniTitle">About Blackstone Quarters</div>
            <p>
              Sydney-based short-stay operator focused on clean, reliable, and
              compliant hosting. We treat your property like a professional asset,
              not a side-hustle.
            </p>
            <ul className="ticklist">
              <li>Owner-first agreements</li>
              <li>Detailed monthly statements</li>
              <li>On-call guest support</li>
              <li>Preferred contractor network</li>
            </ul>
            <div className="idBlock">
              <div>Insurer: <strong>GIO Renters STR Insurance</strong></div>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footerFlex">
          <span>© {currentYear} Blackstone Quarters</span>
          <div className="footerLinks">
            <a href="#compliance">Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
