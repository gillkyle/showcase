/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import getArtistUrl from "../utils/get-artist-url"

const ArtistLink = ({ artistName, fontSize, ...props }) => {
  return (
    <Link
      to={`/artist/${getArtistUrl(artistName)}`}
      sx={{ textDecoration: `none` }}
    >
      <span
        sx={{
          fontSize: fontSize || [2, 3],
          variant: `gradient.text`,
        }}
        {...props}
      >
        {artistName}
      </span>
    </Link>
  )
}

export default ArtistLink
