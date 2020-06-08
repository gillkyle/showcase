/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const Tag = ({ tag, small, ...props }) => (
  <Link
    to={`/tag/${tag.data.name.toLowerCase()}`}
    sx={{ textDecoration: `none` }}
  >
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
        border: `1px solid transparent`,
        width: `100%`,
        mr: `2`,
        "&:hover, &:active": {
          border: `1px solid ${tag.data.text_color}`,
        },
      }}
      {...props}
    >
      {tag.data.name}
    </span>
  </Link>
)

export default Tag
