declare namespace Intl {
  const Locale: {
    new (locales?: BCP47LanguageTag | BCP47LanguageTag[]): Locale;
  };

  interface Locale {
    minimize: () => Locale;
    maximize: () => Locale;
    language: string;
    region: string;
    script: string;
  }
}
