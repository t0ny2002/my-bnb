// src/config/blockedDates.js

// Each range is [inclusive start, inclusive end] in ISO yyyy-mm-dd
// Just tweak these however you like.
export const BLOCKED_DATE_RANGES = {
    pyrmont: [
      { start: '2025-11-10', end: '2025-11-13' }, 
      { start: '2025-12-01', end: '2025-12-12' }, 
      { start: '2025-12-14', end: '2025-12-18' }, 
      { start: '2025-12-20', end: '2025-12-29' }, 
      { start: '2026-01-06', end: '2026-01-13' }, 
      { start: '2026-01-15', end: '2026-01-19' }, 
    ],
    'pyrmont-2': [
      { start: '2025-11-05', end: '2025-11-08' },
      { start: '2025-12-01', end: '2025-12-14' },
      { start: '2025-12-20', end: '2025-12-24' },
      { start: '2025-12-25', end: '2025-12-29' },
      { start: '2025-12-10', end: '2025-12-14' },
      { start: '2026-01-05', end: '2026-01-13' },
      { start: '2026-01-15', end: '2026-01-20' },
    ],
    'pyrmont-3': [
      { start: '2025-11-18', end: '2025-11-21' },
      { start: '2025-12-03', end: '2025-12-16' },
      { start: '2025-12-19', end: '2025-12-27' },
      { start: '2026-01-04', end: '2026-01-12' },
      { start: '2026-01-16', end: '2026-01-23' },
    ],
  
    // fallback if a property id isn't listed above
    default: [
      { start: '2025-11-25', end: '2025-11-28' },
    ],
  };
  