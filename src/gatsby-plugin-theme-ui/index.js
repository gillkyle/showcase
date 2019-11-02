export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: [`750px`, `1050px`],
  fonts: {
    body: "Cabin, system-ui, sans-serif",
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
  gradient: {
    text: {
      background: theme =>
        `linear-gradient(${theme.colors.secondary}, ${theme.colors.primary})`,
      WebkitBackgroundClip: `text`,
      WebkitTextFillColor: `transparent`,
    },
  },
  colors: {
    text: "#DDD",
    textMuted: ["#AAAFAF", "#4b4e56"],
    background: "#121517",
    faint: "#222",
    border: "#333",
    primary: "#008BFF",
    primaryMuted: "#CCF4FF",
    secondary: "#9DD0FF",
    secondaryMuted: "#CCE8FF",
    card: "rgba(33,37,41,0.75)",
    shadow: "rgba(50, 50, 93, 0.17)",
    modes: {
      light: {},
    },
  },
}
