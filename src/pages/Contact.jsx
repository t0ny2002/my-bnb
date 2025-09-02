// src/pages/Contact.jsx
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: 'Appraisal',
    message: '',
    company: '', // honeypot
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const phoneOk = (v) => v.trim() === '' || /^[\d\s()+-]{6,}$/.test(v.trim());

  const errors = {
    name: form.name.trim() ? '' : 'Please tell us your name.',
    email: emailOk(form.email) ? '' : 'Enter a valid email.',
    phone: phoneOk(form.phone) ? '' : 'Phone looks off.',
    message:
      form.message.trim().length >= 12
        ? ''
        : 'Add a few more details (12+ chars).',
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });

    if (form.company) return; // honeypot
    if (hasErrors) {
      setStatus({ state: 'error', msg: 'Please fix the highlighted fields.' });
      return;
    }

    setStatus({ state: 'loading', msg: 'Sending...' });

    try {
      const res = await fetch('https://formspree.io/f/meolzrga', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget), // send all fields
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || `Error ${res.status}`);
      }

      setStatus({
        state: 'success',
        msg: 'Thanks! We’ll be in touch shortly.',
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        inquiry: 'Appraisal',
        message: '',
        company: '',
      });
      setTouched({});
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err.message || 'Something went wrong.',
      });
    }
  };

  return (
    <main className="section contact" aria-labelledby="contact-title">
      <div className="container contact__wrap">
        {/* Left: Info */}
        <section className="contact__info">
          <header className="contact__header">
            <h1 id="contact-title" className="section-title-2">
              Contact
            </h1>
            <p className="lead">
              Tell us a little about your property and goals. We’ll reply fast
              with next steps and a clear path to returns.
            </p>
          </header>

          <ul className="contact__cards" aria-label="Contact methods">
            <li className="card">
              <div className="card__icon" aria-hidden>
                ✉️
              </div>
              <div className="card__body">
                <h3>Email</h3>
                <a
                  href="mailto:properties@crownstonequarters.com"
                  className="link"
                >
                  properties@crownstonequarters.com
                </a>
                <p className="muted">Best for proposals and documents.</p>
              </div>
            </li>
            <li className="card">
              <div className="card__icon" aria-hidden>
                📞
              </div>
              <div className="card__body">
                <h3>Phone</h3>
                <a href="tel:+61431851428" className="link">
                  +61 431 851 428
                </a>
                <p className="muted">Mon–Fri, 9am–6pm AEST</p>
              </div>
            </li>
            <li className="card">
              <div className="card__icon" aria-hidden>
                📍
              </div>
              <div className="card__body">
                <h3>Location</h3>
                <p>Sydney, NSW</p>
                <p className="muted">Inspections across Greater Sydney.</p>
              </div>
            </li>
          </ul>

          <div className="contact__badges" aria-label="Trust">
            <span className="badge">Compliance-first</span>
            <span className="badge">Transparent reporting</span>
            <span className="badge">No-party policy</span>
            <span className="badge">Predictable payouts</span>
          </div>
        </section>

        {/* Right: Form */}
        <section className="contact__form">
          <form
            noValidate
            aria-describedby="form-status"
            action="https://formspree.io/f/meolzrga"
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={onChange}
              className="hp"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="field">
              <label htmlFor="name">Your name *</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="e.g. Alex Chen"
                aria-invalid={!!(touched.name && errors.name)}
                aria-describedby={
                  touched.name && errors.name ? 'e-name' : undefined
                }
              />
              {touched.name && errors.name && (
                <p id="e-name" className="err">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="fieldGrid">
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="you@example.com"
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={
                    touched.email && errors.email ? 'e-email' : undefined
                  }
                />
                {touched.email && errors.email && (
                  <p id="e-email" className="err">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="+61 ..."
                  aria-invalid={!!(touched.phone && errors.phone)}
                  aria-describedby={
                    touched.phone && errors.phone ? 'e-phone' : undefined
                  }
                />
                {touched.phone && errors.phone && (
                  <p id="e-phone" className="err">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <fieldset className="field">
              <legend>What do you need?</legend>
              <div
                className="chips"
                role="radiogroup"
                aria-label="Inquiry type"
              >
                {['Appraisal', 'Guaranteed Rent', 'Management', 'General'].map(
                  (v) => (
                    <label
                      key={v}
                      className={`chip ${form.inquiry === v ? 'is-active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="inquiry"
                        value={v}
                        checked={form.inquiry === v}
                        onChange={onChange}
                      />
                      {v}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Tell us about your property (suburb, bedrooms, goals)..."
                aria-invalid={!!(touched.message && errors.message)}
                aria-describedby={
                  touched.message && errors.message ? 'e-message' : undefined
                }
              />
              {touched.message && errors.message && (
                <p id="e-message" className="err">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status.state === 'loading'}
              >
                {status.state === 'loading' ? 'Sending…' : 'Send message'}
              </button>
              <p id="form-status" className={`status ${status.state}`}>
                {status.msg}
              </p>
            </div>

            <p className="tiny">
              By submitting, you agree to our no-spam policy. We only use your
              details to reply.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
