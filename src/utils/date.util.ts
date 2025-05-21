export const getDaysBetweenDates = (startDate: string, endDate: string): number => {
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

  const start = Date.UTC(startYear, startMonth - 1, startDay);
  const end = Date.UTC(endYear, endMonth - 1, endDay);

  const diffInMs = end - start;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export const timeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (years > 0) return `Hace ${years}a`;
  if (months > 0) return `Hace ${months}m`;
  if (days > 0) return `Hace ${days}d`;
  if (hours > 0) return `Hace ${hours}h`;
  if (minutes > 0) return `Hace ${minutes}min`;
  return `Hace ${seconds}s`;
}

export const getFullDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}