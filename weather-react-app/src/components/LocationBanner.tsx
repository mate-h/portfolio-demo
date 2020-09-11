import React from "react";
import { Paragraph } from "./Paragraph";
import { usePersistedState } from "../lib/hooks";
import { useContainer } from "unstated-next";
import { CurrentPosition } from "..";
import { useTranslation } from "../lib/translations";

export function LocationBanner() {
  const [visible, setVisible] = usePersistedState(
    "locationBanner.visible",
    true
  );
  const { permissionState, setPosition } = useContainer(CurrentPosition);
  const { t } = useTranslation();
  function handler() {
    function success(p: Position) {
      // TODO: display snackbar "Location updated" with new, more accurate location
      setPosition(p);
    }
    function error(e: PositionError) {
      // TODO: display snackbar with error
      console.log(e);
    }
    navigator.geolocation.getCurrentPosition(success, error, {});
  }
  function handlerDismiss() {
    setVisible(false);
  }
  if (!visible) return null;

  if (permissionState === "denied")
    return (
      <div>
        <Paragraph className="body2">
          {t('locationBanner.denied')}
        </Paragraph>
        <button onClick={handlerDismiss}>{t('locationBanner.dismiss')}</button>
      </div>
    );

  // only render if permission can be granted by prompt
  if (permissionState !== "prompt") return null;

  return (
    <div>
      <Paragraph className="body2">
        {t('locationBanner.prompt')}
      </Paragraph>
      <button onClick={handlerDismiss}>{t('locationBanner.dismiss')}</button>
      <button onClick={handler}>{t('locationBanner.allow')}</button>
    </div>
  );
}
