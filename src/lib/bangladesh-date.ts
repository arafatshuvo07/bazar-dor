const dateFormatter = new Intl.DateTimeFormat("bn-BD", {
  timeZone: "Asia/Dhaka",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const machineDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Dhaka",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getBangladeshDate(date: Date) {
  const parts = machineDateFormatter.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((value) => value.type === type)?.value;

  return {
    label: dateFormatter.format(date),
    dateTime: `${part("year")}-${part("month")}-${part("day")}`,
  };
}
