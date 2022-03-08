function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const localeDate = date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const localeTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${localeDate} ${localeTime}`;
}

export default formatDateTime;
