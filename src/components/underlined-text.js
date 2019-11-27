/** @jsx jsx */
import { jsx } from "theme-ui"

const Underline = ({ children }) => (
  <span
    sx={{
      // textTransform: `uppercase`,
      px: `1`,
      pb: `1`,
      background: theme =>
        `linear-gradient(to bottom, rgba(0,0,0,0) 65%, ${theme.colors.primary} 65%)`,
      borderRadius: `2`,
    }}
  >
    {children}
  </span>
)

export default Underline
