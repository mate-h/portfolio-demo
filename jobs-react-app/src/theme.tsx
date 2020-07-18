import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    // Inter + system font stack
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      // https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color/
      light: "#009dff", // 500
      main: "#007aff", // 700 system blue
      dark: "#2045cd", // 900
    },
    secondary: {
      light: "#ffb54c", // 300
      main: "#ff9500", // 500 system orange
      dark: "#f57902", // 700
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fafafa",
    },
  },
  overrides: {
    MuiTypography: {
      // correct material spec
      overline: {
        fontSize: "0.625rem",
        fontWeight: 500,
        letterSpacing: "calc(1.5 / 14 * 1em)",
        lineHeight: 1.6,
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        fontSize: "calc(14 / 16 * 1rem)",
        fontWeight: 500,
        letterSpacing: "calc(0.1 / 14 * 1em)",
        lineHeight: 1.71428571429,
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      disableElevation: true,
    },
  },
});

export default theme;
