import React from "react";
import { Paragraph } from "./Paragraph";
import {
  supported,
  getLanguageKey,
  nativeNames,
  getEmoji,
} from "../lib/languages";
import { useContainer } from "unstated-next";
import { Settings } from "..";
import { t } from "../lib/translations";
export function LanguagePicker({ className }: { className?: string }) {
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
    <div className={["sm:flex sm:flex-wrap", className].join(" ")}>
      <label className="cursor-pointer" htmlFor="language">
        <Paragraph bottom={8} className="caption text-white">
          {t("language", locale)}
        </Paragraph>
      </label>

      <span className="button-states button-states-light dropdown dropdown-right-3 sm:dropdown-right-1 relative h-10 sm:h-6 mx-0 sm:mx-4 md:mx-6 inline-block">
        <select
          onChange={handler}
          value={value}
          className="body1 sm:body2 bg-white transition-shadow duration-150 shadow-hairline shadow-hairline-light rounded h-10 sm:h-6 pr-10 px-4 sm:px-2 sm:pr-8 appearance-none outline-none focus:shadow-outline"
          name="language"
          id="language"
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
    </div>
  );
}
