import React from "react";
export function CityPicker() {
  return (
    <>
      <label htmlFor="browser">Choose your browser from the list:</label>
      <input list="browsers" name="browser" id="browser" />

      <datalist id="browsers">
        <option value="Edge" />
        <option value="Firefox" />
        <option value="Chrome" />
        <option value="Opera" />
      </datalist>
    </>
  );
}
