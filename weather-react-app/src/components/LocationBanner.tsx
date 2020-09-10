import React, { useState, useEffect } from "react";
import { Paragraph } from "./Paragraph";
import { usePersistedState } from "../lib/hooks";

export function LocationBanner() {
  const [permissionState, setPermissionState] = useState<PermissionState>();
  const [visible, setVisible] = usePersistedState(
    "locationBanner.visible",
    true
  );
  useEffect(() => {
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then(function (result) {
        if (result.state == "granted") {
          setPermissionState(result.state);
        } else if (result.state == "prompt") {
          setPermissionState(result.state);
        } else if (result.state == "denied") {
          setPermissionState(result.state);
        }
        result.onchange = function () {
          setPermissionState(result.state);
        };
      });
  });
  const revealPosition: PositionCallback = (position) => {
    console.log(position);
  };
  function positionDenied() {
    console.log("denied prompt");
  }
  function handler() {
    navigator.geolocation.getCurrentPosition(revealPosition, positionDenied);
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

  // user has already granted permission
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
