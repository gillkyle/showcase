/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"

const AlbumArt = ({ fixed }) => (
  <div>
    <Img
      sx={{
        borderRadius: 1,
      }}
      fixed={fixed}
    />
  </div>
)

export default AlbumArt
