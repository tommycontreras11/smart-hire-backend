export const getDaysBetweenDates = (startDate: string, endDate: string): number => {
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

  const start = Date.UTC(startYear, startMonth - 1, startDay);
  const end = Date.UTC(endYear, endMonth - 1, endDay);

  const diffInMs = end - start;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};


export const getFullDate = (date?: Date, isNullable: boolean = true) => {
  if(!isNullable && !date) return "";

  const today = date ? date : new Date();

  if(!today) return "";

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}