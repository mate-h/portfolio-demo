/** List of supported locale tags as per OpenWeatherMap API documentation
 *
 * https://openweathermap.org/current#multi
 */
export const supported = [
  "af",
  "al",
  "ar",
  "az",
  "bg",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "eu",
  "fa",
  "fi",
  "fr",
  "gl",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lv",
  "lt",
  "mk",
  "nb",
  "nl",
  "pl",
  "pt-PT",
  "pt-BR",
  "ro",
  "ru",
  "sv",
  "sk",
  "sl",
  "es",
  "sr",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-TW",
  "zu",
];

/** Return the language tag only from a locale tag */
function getLocaleLanguage(bcpTag: string) {
  try {
    return new (Intl as any).Locale(bcpTag).language;
  } catch (e) {
    console.log(e);
  }

  return bcpTag.split("-")[0];
}

/** Return the region tag only from a locale tag */
function getLocaleRegion(bcpTag: string) {
  try {
    return new (Intl as any).Locale(bcpTag).maximize().region;
  } catch (e) {
    console.log(e);
  }

  return bcpTag.split("-").find((a) => a.length === 2 && a.toUpperCase() === a);
}

/** Returns lang parameter used for the OpenWeatherMap API */
export function getLangParam(bcpTag: string) {
  if (bcpTag === "pt-BR") return "pt_br";
  if (bcpTag === "zh") return "zh_cn";
  if (bcpTag === "zh-CN") return "zh_cn";
  if (bcpTag === "zh-TW") return "zh_tw";

  const language = getLocaleLanguage(bcpTag);
  // return deprecated lananguage tags in use by OpenWeatherMap API
  if (language === "cs") return "cz";
  if (language === "ko") return "kr";
  if (language === "lv") return "la";
  if (language === "nb") return "no";

  // fallback to english
  if (!supported.includes(language)) return "en";
  return language;
}

export const nativeNames: {
  [key: string]: string;
} = {
  en: "English",
  af: "Afrikaans",
  am: "አማርኛ",
  ar: "العربية",
  as: "অসমীয়া",
  az: "Azərbaycan",
  be: "Беларуская",
  bg: "Български",
  bn: "বাংলা",
  bs: "Bosanski",
  ca: "Català",
  cs: "Čeština",
  cy: "Cymraeg",
  da: "Dansk",
  de: "Deutsch",
  el: "Ελληνικά",
  es: "Español",
  et: "Eesti",
  eu: "Euskara",
  fa: "فارسی",
  fi: "Suomi",
  fil: "Filipino",
  fr: "Français",
  ga: "Gaeilge",
  gl: "Galego",
  gu: "ગુજરાતી",
  he: "עברית",
  hi: "हिन्दी",
  hr: "Hrvatski",
  hu: "Magyar",
  hy: "Հայերեն",
  id: "Indonesia",
  is: "Íslenska",
  it: "Italiano",
  ja: "日本語",
  jv: "Jawa",
  ka: "Ქართული",
  kk: "Қазақтілі",
  km: "ខ្មែរ",
  kn: "ಕನ್ನಡ",
  ko: "한국어",
  ky: "Кыргызча",
  lo: "ລາວ",
  lt: "Lietuvių",
  lv: "Latviešu",
  mk: "Македонски",
  ml: "മലയാളം",
  mn: "Монгол",
  mr: "मराठी",
  ms: "Melayu",
  my: "မြန်မာ",
  nb: "Norskbokmål",
  ne: "नेपाली",
  nl: "Nederlands",
  or: "ଓଡ଼ିଆ",
  pa: "ਪੰਜਾਬੀ",
  pl: "Polski",
  ps: "پښتو",
  pt: "Português",
  "pt-BR": "Português (BR)",
  ro: "Română",
  ru: "Русский",
  sd: "سنڌي",
  si: "සිංහල",
  sk: "Slovenčina",
  sl: "Slovenščina",
  so: "Soomaali",
  sq: "Shqip",
  sr: "Српски",
  sv: "Svenska",
  sw: "Kiswahili",
  ta: "தமிழ்",
  te: "తెలుగు",
  th: "ไทย",
  tk: "Türkmendili",
  tr: "Türkçe",
  uk: "Українська",
  ur: "اردو",
  uz: "O‘zbek",
  vi: "TiếngViệt",
  yue: "粵語",
  zh: "简体中文",
  "zh-TW": "繁體中文",
  zu: "IsiZulu",
};

/** Returns a key in the nativeNames object */
export function getLanguageKey(bcpTag: string) {
  const language = getLocaleLanguage(bcpTag);
  if (["zh-Hant", "zh-Hant-TW", "zh-TW"].includes(bcpTag)) {
    return "zh-TW";
  }
  if (["pt-BR"].includes(bcpTag)) {
    return "pt-BR";
  }
  return language;
}
/** The native language name of a locale */
export function getName(bcpTag: string) {
  const language = getLanguageKey(bcpTag);
  return nativeNames[language];
}

// source: https://github.com/thekelvinliu/country-code-emoji/blob/master/src/index.js
export function getEmoji(bcpTag: string) {
  const region = getLocaleRegion(bcpTag);
  if (!region) return null;

  // offset between uppercase ascii and regional indicator symbols
  const OFFSET = 127397;

  const chars = [...region.toUpperCase().split("")].map(
    (c) => c.charCodeAt(0) + OFFSET
  );
  return String.fromCodePoint(...chars);
}
