/** @jsx jsx */
import { jsx } from "theme-ui"

const Tag = ({ tag, small, ...props }) => (
  <span
    sx={{
      py: `1`,
      px: small ? `2` : `3`,
      backgroundColor: tag.data.bg_color,
      color: tag.data.text_color,
      borderRadius: `1`,
      textTransform: `uppercase`,
      letterSpacing: 1.2,
      fontWeight: 100,
      fontSize: small ? `0` : `1`,
      mr: `2`,
    }}
    {...props}
  >
    {tag.data.name}
  </span>
)

export default Tag
