import React from "react";
import { Paragraph } from "./Paragraph";
import {
  supported,
  getLanguageKey,
  nativeNames,
  getEmoji,
} from "../lib/languages";
import { useContainer } from "unstated-next";
import { Settings } from "../App";
export function LanguagePicker() {
  const {
    settings: { locale },
    updateSettings,
  } = useContainer(Settings);

  const value = supported.includes(locale) ? locale : getLanguageKey(locale);

  function handler(e: React.ChangeEvent<HTMLSelectElement>) {
    updateSettings({
      locale: e.target.value,
    });
  }
  return (
    <>
      <label htmlFor="cars">
        <Paragraph bottom={8} className="caption text-white">
          Language
        </Paragraph>
      </label>

      <span className="dropdown dropdown-right-3 sm:dropdown-right-1 relative inline-block">
        <select
          onChange={handler}
          value={value}
          className="h-10 sm:h-6 pr-10 rounded px-4 sm:px-2 sm:pr-8 appearance-none outline-none focus:shadow-outline"
          name="cars"
          id="cars"
        >
          {supported
            .map((l) => [l, nativeNames[getLanguageKey(l)], getEmoji(l)])
            .map(([lang, name, emoji]) => (
              <option key={lang} value={lang as string}>
                {emoji} {name || lang}
              </option>
            ))}
        </select>
      </span>
    </>
  );
}
