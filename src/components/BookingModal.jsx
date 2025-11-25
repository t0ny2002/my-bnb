// src/components/BookingModal.jsx
import { useMemo, useState } from 'react';
import './BookingModal.css';

export default function BookingModal({ property, onClose }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const accommodationTotal = nights * property.nightlyRate;
  const total = accommodationTotal + (nights > 0 ? property.cleaningFee : 0);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!checkIn || !checkOut || !name || !email) {
      setError('Please fill in all required fields.');
      return;
    }
    if (nights <= 0) {
      setError('Check-out must be after check-in.');
      return;
    }
    if (guests < 1 || guests > property.maxGuests) {
      setError(`Guests must be between 1 and ${property.maxGuests}.`);
      return;
    }

    // FAKE submission – replace this with real API / email later
    console.log('Fake booking submitted:', {
      property: property.title,
      checkIn,
      checkOut,
      guests,
      name,
      email,
      notes,
      nights,
      total,
    });

    setSubmitted(true);
  }

  if (!property) return null;

  return (
    <div className="booking-backdrop" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-close" onClick={onClose}>
          ×
        </button>

        {!submitted ? (
          <>
            <h2 className="booking-title">Request a Stay</h2>
            <p className="booking-subtitle">{property.title}</p>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="booking-row">
                <label>
                  Check-in<span>*</span>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </label>
                <label>
                  Check-out<span>*</span>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </label>
              </div>

              <div className="booking-row">
                <label>
                  Guests (max {property.maxGuests})
                  <input
                    type="number"
                    min={1}
                    max={property.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  />
                </label>
              </div>

              <div className="booking-row">
                <label>
                  Name<span>*</span>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  Email<span>*</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <label className="booking-notes-label">
                Notes
                <textarea
                  placeholder="Tell us about your trip…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </label>

              {error && <p className="booking-error">{error}</p>}

              <button type="submit" className="booking-submit">
                Submit Enquiry
              </button>
            </form>
          </>
        ) : (
          <div className="booking-success">
            <h2>Enquiry sent ✅</h2>
            <p>
              Thanks, {name.split(' ')[0] || 'there'}! We’ve received your
              request for <strong>{property.title}</strong>.
            </p>
            <p>
              We’ll review availability for {nights} night
              {nights === 1 ? '' : 's'} from <strong>{checkIn}</strong> to{' '}
              <strong>{checkOut}</strong> and get back to you at{' '}
              <strong>{email}</strong>.
            </p>
            <button className="booking-submit" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
