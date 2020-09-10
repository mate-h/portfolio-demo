const language = navigator.language;

export const dateFormat = (date: string) =>
  new Intl.DateTimeFormat(language).format(new Date(date));

export const relativeFormat = (d: any) => {
  try {
    const diff = new Date().getTime() - new Date(d).getTime();
    const days = diff / (1000 * 3600 * 24);
    const rtf = new (Intl as any).RelativeTimeFormat(language);
    if (days > 31) {
      const months = diff / (1000 * 3600 * 24 * 30.42);
      return rtf.format(Math.ceil(-months), "month");
    }
    if (days > 1) {
      return rtf.format(Math.ceil(-days), "day");
    }
    const hours = diff / (1000 * 3600);
    if (hours >= 1) {
      return rtf.format(Math.ceil(-hours), "hour");
    }
    const minutes = diff / (1000 * 60);
    if (minutes >= 1) {
      return rtf.format(Math.ceil(-minutes), "minute");
    }
    return ({
      "hu-HU": "most",
      en: "now",
      "en-US": "now",
      "en-GB": "now",
    } as any)[language];
  } catch (e) {
    return dateFormat(d);
  }
};

export const formatCelsius = (kelvin: number) => {
  const formatter = new Intl.NumberFormat(language, {
    style: "unit",
    unit: "celsius",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  } as any);
  const c = kelvin - 273.15;
  const unit = formatter
    .formatToParts(c)
    .find((p) => (p.type as any) === "unit");
  const s = formatter.format(c);
  if (unit) {
    const location = s.indexOf(unit.value);

    return [
      { value: s.slice(0, location) },
      { value: unit.value, unit: true },
      { value: s.slice(location + unit.value.length) },
    ].filter((a) => a.value);
  } else return [{ value: s }];
};
