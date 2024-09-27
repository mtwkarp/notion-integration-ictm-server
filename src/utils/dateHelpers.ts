export function getFormatedKyivDate(): string {
  const now = new Date();
  const kyivFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = kyivFormatter.formatToParts(now).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {} as Record<string, string>);

  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function filterDatesBeforeTargetDate(dates: string[], comparisonDate: string): string[] {
  // Convert the comparison date to a Date object
  const comparison = new Date(comparisonDate);

  // Filter the dates array
  return dates.filter((dateStr) => {
    const date = new Date(dateStr);
    return date >= comparison;
  });
}
