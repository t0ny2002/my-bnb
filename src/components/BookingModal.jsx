// src/components/BookingModal.jsx
import { useMemo, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './BookingModal.css';
import { BLOCKED_DATE_RANGES } from '../config/blockedDates';

/* ========= helpers for fake “booked-out” dates ========= */

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

// generate random 3/4/5-night blocks over the next N months
function generateRandomBlockedRanges({
  startDate = new Date(),
  monthsAhead = 3,
  blocksPerMonth = 4,
  groupSizes = [3, 4, 5],
}) {
  const ranges = [];
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  for (let m = 0; m < monthsAhead; m++) {
    const monthIndex = (startMonth + m) % 12;
    const year = startYear + Math.floor((startMonth + m) / 12);
    const totalDays = daysInMonth(year, monthIndex);

    for (let b = 0; b < blocksPerMonth; b++) {
      const size = groupSizes[Math.floor(Math.random() * groupSizes.length)]; // 3/4/5
      const maxStartDay = totalDays - size + 1;
      const day = 1 + Math.floor(Math.random() * maxStartDay);

      const start = new Date(year, monthIndex, day);
      const end = addDays(start, size - 1);

      // ignore blocks fully in the past
      if (end < startDate) continue;

      ranges.push({ startDate: start, endDate: end });
    }
  }

  return ranges;
}

function expandRangesToDates(ranges) {
  const dates = [];
  for (const r of ranges) {
    let cur = new Date(r.startDate);
    while (cur <= r.endDate) {
      dates.push(new Date(cur));
      cur = addDays(cur, 1);
    }
  }
  return dates;
}

/* ==================== component ==================== */

export default function BookingModal({ property, onClose }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // calendar selection state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  // fake busy dates (same each time the modal mounts)
  const blockedRanges = useMemo(() => {
    const rangesForProperty =
      BLOCKED_DATE_RANGES[property.id] || BLOCKED_DATE_RANGES.default || [];

    return rangesForProperty.map((r) => ({
      startDate: new Date(r.start),
      endDate: new Date(r.end),
    }));
  }, [property.id]);

  const disabledDates = useMemo(
    () => expandRangesToDates(blockedRanges),
    [blockedRanges]
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

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
      property: property.title || property.alias || property.address,
      checkIn,
      checkOut,
      guests,
      name,
      email,
      notes,
      nights,
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
            <p className="booking-subtitle">
              {property.title || property.alias || property.address}
            </p>

            {/* calendar block */}
            <div className="booking-calendar">
              <DateRange
                ranges={range}
                onChange={({ selection }) => {
                  setRange([selection]);
                  setCheckIn(selection.startDate.toISOString().slice(0, 10));
                  setCheckOut(selection.endDate.toISOString().slice(0, 10));
                }}
                moveRangeOnFirstSelection={false}
                months={1}
                minDate={new Date()}
                disabledDates={disabledDates}
                showDateDisplay={false} // 👈 hide the big inputs on top
                rangeColors={['#111']} // optional: make the selection black
              />
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="booking-row booking-row--summary">
                <div>
                  <strong>Check-in:</strong>{' '}
                  {checkIn || <span className="muted">select a date</span>}
                </div>
                <div>
                  <strong>Check-out:</strong>{' '}
                  {checkOut || <span className="muted">select a date</span>}
                </div>
                <div>
                  <strong>Nights:</strong> {nights}
                </div>
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
              request for{' '}
              <strong>
                {property.title || property.alias || property.address}
              </strong>
              .
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
