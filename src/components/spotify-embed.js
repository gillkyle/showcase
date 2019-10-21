/** @jsx jsx */
import { jsx } from "theme-ui"

const SpotifyEmbed = ({ id }) => (
  <iframe
    id="embed"
    title="Spotify embed"
    src={`https://open.spotify.com/embed/track/${id}`}
    width="480"
    height="80"
    frameBorder="0"
    allowtransparency="true"
    allow="encrypted-media"
    masktype="true"
  ></iframe>
)

export default SpotifyEmbed
