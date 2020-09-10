import React from "react";
import { Paragraph } from "./Paragraph";
import { usePersistedState } from "../lib/hooks";
import { useContainer } from "unstated-next";
import { CurrentPosition } from "../App";

export function LocationBanner() {
  const [visible, setVisible] = usePersistedState(
    "locationBanner.visible",
    true
  );
  const { permissionState, setPosition } = useContainer(CurrentPosition);
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
          For more accurate results, consider allowing location access in your
          browser's address bar
        </Paragraph>
        <button onClick={handlerDismiss}>Dismiss</button>
      </div>
    );

  // only render if permission can be granted by prompt
  if (permissionState !== "prompt") return null;

  return (
    <div>
      <Paragraph className="body2">
        Allow location access for more accurate results
      </Paragraph>
      <button onClick={handlerDismiss}>Dismiss</button>
      <button onClick={handler}>Allow</button>
    </div>
  );
}
