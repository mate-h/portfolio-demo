export const dateFormat = (date: string) =>
  new Intl.DateTimeFormat(navigator.language).format(new Date(date));
export const relativeFormat = (d: string) => {
  try {
    const diff = new Date().getTime() - new Date(d).getTime();
    const days = diff / (1000 * 3600 * 24);
    const rtf = new (Intl as any).RelativeTimeFormat(navigator.language);
    if (days > 31) {
      const months = diff / (1000 * 3600 * 24 * 30.42);
      return rtf.format(Math.ceil(-months), "month");
    }
    if (days > 1) {
      return rtf.format(Math.ceil(-days), "day");
    }
    const hours = diff / (1000 * 3600);
    return rtf.format(Math.ceil(-hours), "hour");
  } catch (e) {
    return dateFormat(d);
  }
};
