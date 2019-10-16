/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"

const AlbumArt = ({ fixed }) => (
  <Img
    sx={{
      borderRadius: 1,
    }}
    fixed={fixed}
  />
)

export default AlbumArt
