/** @jsx jsx */
import { jsx } from "theme-ui"

const Underline = ({ children }) => (
  <span
    sx={{
      position: `relative`,
      zIndex: 0,
      // textTransform: `uppercase`,
      // px: `1`,
      // pb: `1`,
      // background: theme =>
      //   `linear-gradient(to bottom, rgba(0,0,0,0) 65%, ${theme.colors.primary} 65%)`,
      "&::before": {
        content: `""`,
        position: `absolute`,
        top: `2px`,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: `-1`,
        backgroundColor: `#2884d2`,
        transform: `skewX(-15deg) skewY(-1.5deg)`,
        margin: `12px -6px 2px -4px`,
        borderRadius: `8px 12px 12px 20px`,
      },
    }}
  >
    {children}
  </span>
)

export default Underline
