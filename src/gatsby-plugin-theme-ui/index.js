export default {
  initialColorModeName: "dark",
  useColorSchemeMediaQuery: true,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "PT Sans, system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
    bold: 700,
  },
  // radii: [4, 8, 16],
  radii: [2, 0, 0],
  colors: {
    text: "#DDD",
    textMuted: "#AAAFAF",
    background: "#1b1b1b",
    border: "#333",
    primary: "#00caff",
    primaryMuted: "#CCF4FF",
    secondary: "#008bff",
    secondaryMuted: "#CCE8FF",
    card: "#222324",
    gradient: theme =>
      `linear-gradient(-180deg, ${theme.colors.primary},${theme.colors.secondary})`,
    shadow: "rgba(50, 50, 93, 0.17)",
    modes: {
      light: {
        text: "#222",
        background: "#EDEDED",
        border: "#EEE",
        primary: "#00caff",
        secondary: "#008bff",
        card: "#CECECE",
        gradient: theme =>
          `linear-gradient(-180deg, ${theme.colors.primary},${theme.colors.secondary})`,
      },
    },
  },
}
