/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"

const AlbumArt = ({ fluid, ...props }) => (
  <Img
    sx={{
      borderRadius: `1`,
    }}
    fluid={{ ...fluid, aspectRatio: 1 }}
    {...props}
  />
)

export default AlbumArt
