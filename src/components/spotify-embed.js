/** @jsx jsx */
import { jsx } from "theme-ui"

const SpotifyEmbed = ({ id }) => (
  <div
    sx={{
      backgroundColor: `background`,
      border: `1px solid`,
      borderColor: `border`,
      borderRadius: `1`,
      p: `2`,
      mb: `3`,
      display: `grid`,
      gridGap: `3`,
      gridTemplateColumns: `auto auto 1fr`,
      justifyContent: `center`,
    }}
  >
    <iframe
      id="embed"
      title="Spotify embed"
      src={`https://open.spotify.com/embed/track/${id}`}
      width="280"
      height="80"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
      masktype="true"
    ></iframe>
    <div
      sx={{
        display: `flex`,
        alignItems: `center`,
        fontSize: `1`,
        letterSpacing: `2px`,
        textTransform: `uppercase`,
        color: `textMuted.1`,
      }}
    >
      Song Player
    </div>
  </div>
)

export default SpotifyEmbed
