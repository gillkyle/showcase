export default {
  initialColorMode: "dark",
  initialColorModeName: "light",
  useColorSchemeMediaQuery: true,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "Roboto, system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  radii: [4, 8],
  colors: {
    text: "#222",
    background: "#EDEDED",
    border: "#EEE",
    primary: "#00caff",
    secondary: "#008bff",
    gradient: theme =>
      `linear-gradient(-180deg, ${theme.colors.primary},${theme.colors.secondary})`,
    shadow: "rgba(50, 50, 93, 0.17)",
    modes: {
      dark: {
        text: "#DDD",
        background: "#1b1b1b",
        border: "#333",
        primary: "#00caff",
        secondary: "#008bff",
        gradient: theme =>
          `linear-gradient(-180deg, ${theme.colors.primary},${theme.colors.secondary})`,
      },
    },
  },
}
