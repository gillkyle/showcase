/** @jsx jsx */
import { jsx } from "theme-ui"

const SpotifyEmbed = ({ id }) => (
  <iframe
    src={`https://open.spotify.com/embed/track/${id}`}
    width="400"
    height="80"
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media"
  ></iframe>
)

export default SpotifyEmbed
