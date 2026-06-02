// src/pages/Contact.jsx
import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import './Contact.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  inquiry: 'Appraisal',
  message: '',
  company: '',
};

const TOUCHED_FIELDS = {
  name: true,
  email: true,
  phone: true,
  message: true,
};

const INQUIRY_OPTIONS = [
  'Appraisal',
  'Guaranteed Rent',
  'Management',
  'General',
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{6,}$/;

const CONTACT_METHODS = [
  {
    label: 'Email',
    value: 'properties@crownstonequarters.com',
    href: 'mailto:properties@crownstonequarters.com',
    note: 'Best for proposals and documents.',
    icon: <FiMail />,
  },
  {
    label: 'Phone',
    value: '0449 537 675',
    href: 'tel:+61449537675',
    note: 'Mon–Fri, 9am–6pm AEST',
    icon: <FiPhone />,
  },
  {
    label: 'Location',
    value: 'Sydney, NSW',
    note: 'Inspections across Greater Sydney.',
    icon: <FiMapPin />,
  },
];

const TRUST_BADGES = [
  'Compliance-first',
  'Transparent reporting',
  'No-party policy',
  'Predictable payouts',
];

const emailOk = (v) => EMAIL_RE.test(v.trim());
const phoneOk = (v) => v.trim() === '' || PHONE_RE.test(v.trim());

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const errors = {
    name: form.name.trim() ? '' : 'Please tell us your name.',
    email: emailOk(form.email) ? '' : 'Enter a valid email.',
    phone: phoneOk(form.phone) ? '' : 'Enter a valid phone number.',
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
    setTouched(TOUCHED_FIELDS);

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
      setForm(INITIAL_FORM);
      setTouched({});
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err.message || 'Something went wrong.',
      });
    }
  };

  return (
    <main className="contact" aria-labelledby="contact-title">
      <div className="container contact__wrap">
        <section className="contact__info">
          <header className="contact__header">
            <p className="contact__eyebrow">Crownstone Quarters</p>
            <h1 id="contact-title">Contact</h1>
            <p className="lead">
              Tell us a little about your property and goals. We’ll reply fast
              with next steps and a clear path to returns.
            </p>
          </header>

          <ul className="contact__cards" aria-label="Contact methods">
            {CONTACT_METHODS.map(({ label, value, href, note, icon }) => (
              <li className="contact-card" key={label}>
                <div className="contact-card__icon" aria-hidden="true">
                  {icon}
                </div>
                <div className="contact-card__body">
                  <h2>{label}</h2>
                  {href ? (
                    <a href={href} className="contact-link">
                      {value}
                    </a>
                  ) : (
                    <p className="contact-card__value">{value}</p>
                  )}
                  <p>{note}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="contact__badges" aria-label="Trust">
            {TRUST_BADGES.map((badge) => (
              <span className="contact-badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>
        </section>

        <section className="contact__form" aria-label="Contact form">
          <form
            noValidate
            aria-describedby="form-status"
            action="https://formspree.io/f/meolzrga"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={onChange}
              className="hp"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="contact-form__header">
              <h2>Send an enquiry</h2>
              <p>Share the essentials and we’ll come back with next steps.</p>
            </div>

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
                {INQUIRY_OPTIONS.map((v) => (
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
                ))}
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
