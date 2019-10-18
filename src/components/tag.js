/** @jsx jsx */
import { jsx } from "theme-ui"

const Tag = ({ tag }) => (
  <span
    sx={{
      py: `1`,
      px: `3`,
      backgroundColor: tag.data.bg_color,
      color: tag.data.text_color,
      borderRadius: `0`,
      textTransform: `uppercase`,
      letterSpacing: 1.2,
      fontWeight: 100,
      fontSize: `1`,
    }}
  >
    {tag.data.name}
  </span>
)

export default Tag
