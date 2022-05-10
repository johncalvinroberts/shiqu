export const formatDateInTimezone = (time: number, timeZone: string) => {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
  };
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const startingDate = new Date(time);
  const dateInNewTimezone = formatter.format(startingDate);
  return dateInNewTimezone;
};
