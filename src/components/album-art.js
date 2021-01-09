/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image";

const AlbumArt = ({ fluid, ...props }) => (
  <GatsbyImage
    image={{ ...fluid, aspectRatio: 1 }}
    sx={{
      borderRadius: `1`,
    }}
    {...props} />
)

export default AlbumArt
