import leftPad from 'left-pad';

export default function formatDate(date) {
  const yyyy = leftPad(date.getFullYear(), 4, 0);
  const mm = leftPad(date.getMonth() + 1, 2, 0);
  const dd = leftPad(date.getDate(), 2, 0);
  return [yyyy, mm, dd].join('-');
}

export function formatTime(date) {
  const hh = leftPad(date.getHours(), 2, 0);
  const mm = leftPad(date.getMinutes() + 1, 2, 0);
  return [hh, mm].join(':');
}

export function formatTimezone(date) {
  const offset = date.getTimezoneOffset();
  if (offset === 0) return 'Z';
  // From MDN: the offset is positive if the local timezone is behind UTC
  // and negative if it is ahead.
  const sign = offset < 0 ? '+' : '-';
  const hh = leftPad(Math.abs(offset) / 60 | 0, 2, 0);
  const mm = leftPad(Math.abs(offset) % 60, 2, 0);
  return sign + [hh, mm].join(':');
}

export function formatDateTime(date) {
  return formatDate(date) + 'T' + formatTime(date) + formatTimezone(date);
}
