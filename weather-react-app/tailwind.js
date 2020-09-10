module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      sans: [
        "var(--font-family)",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    opacity: {
      "06": "0.06",
      12: "0.12",
      24: "0.24",
      38: "0.38",
      54: "0.54",
      72: "0.72",
      87: "0.87",
      100: "1",
    },
    extend: {
      textColor: {
        primary: "#007aff",
      },
      backgroundColor: {
        primary: "#007aff",
        inherit: "inherit",
      },
      height: {
        14: "3.5rem",
      },
      // Material Design type scale
      fontSize: {
        "7xl": "6rem", // 96pt
        "6xl": "3.75rem", // 60pt
        "5xl": "3rem", // 48pt
        "4xl": "2.125rem", // 34pt
        "2xs": "0.625rem", // 10pt
      },
    },
  },
  variants: {},
  plugins: [],
};
