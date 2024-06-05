export function getKyivDate(): string {
  const now = new Date();
  const kyivFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const parts = kyivFormatter.formatToParts(now).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {} as Record<string, string>);

  return `${parts.year}-${parts.month}-${parts.day}`;
}
