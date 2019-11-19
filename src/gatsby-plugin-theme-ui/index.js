export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: [`750px`, `1000px`],
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
  radii: [0, 2, 4, 8],
  gradient: {
    text: {
      background: theme =>
        `linear-gradient(${theme.colors.secondary}, ${theme.colors.primary})`,
      WebkitBackgroundClip: `text`,
      WebkitTextFillColor: `transparent`,
    },
    button: {
      background: theme =>
        `linear-gradient(${theme.colors.secondary}, ${theme.colors.primary})`,
    },
  },
  button: {
    default: {
      variant: `gradient.button`,
      textDecoration: `none`,
      letterSpacing: 1.4,
      textTransform: `uppercase`,
      fontWeight: 700,
      fontSize: `3`,
      py: `2`,
      px: `4`,
      color: `text`,
      borderRadius: `2`,
      display: `flex`,
      alignItems: `center`,
      cursor: `pointer`,
    },
    link: {
      textDecoration: `none`,
      color: `white`,
      fontSize: `2`,
      px: `3`,
      py: `2`,
      transition: `0.3s all`,
      borderRadius: `3`,
      "&:hover": {
        backgroundColor: `faint`,
      },
    },
  },
  input: {
    default: {
      fontSize: `3`,
      px: `3`,
      py: `2`,
      borderRadius: `2`,
      display: `flex`,
      alignItems: `center`,
      backgroundColor: `shadow`,
      borderColor: `border`,
      borderStyle: `solid`,
      color: `text`,
      transition: `0.3s all`,
      outline: 0,
      "&:focus,  &:active": {
        boxShadow: theme =>
          `0 0 0px 3px ${theme.colors.background}, 0 0 0px 5px ${theme.colors.border}`,
      },
    },
  },
  colors: {
    text: "#DDD",
    textMuted: ["#AAAFAF", "#4b4e56"],
    background: "#121517",
    faint: "#444",
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
