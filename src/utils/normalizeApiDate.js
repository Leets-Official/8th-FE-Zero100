export function normalizeApiDate(value) {
  if (typeof value !== 'string') return '';

  const match = value.match(/^(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(\d{1,2}):(\d{2})$/);

  if (!match) return value;

  const [, year, month, day, hour, minute] = match;
  const pad = (part) => part.padStart(2, '0');

  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${minute}:00+09:00`;
}
