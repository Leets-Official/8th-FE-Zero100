const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function formatCreatedAt(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  const parts = dateFormatter.formatToParts(date);

  const getPart = (type) => parts.find((part) => part.type === type)?.value ?? '';

  return `${getPart('year')}년 ${getPart('month')}월 ${getPart('day')}일 ${getPart('hour')}:${getPart('minute')}`;
}
