/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { formatDistance } from "date-fns"

import Clap from "./clap"
import { useQueryClapsById } from "../hooks/useClaps"

const SongMenu = ({ spotifyId, songTimestamp, authorName }) => {
  const claps = useQueryClapsById(spotifyId)
  console.log(claps)

  return (
    <Fragment>
      <div sx={{ mb: 3 }}>
        by: <span sx={{ color: `text` }}>{authorName}</span>
      </div>
      <div
        sx={{
          textTransform: `uppercase`,
          fontSize: `0`,
          fontWeight: `bold`,
          mb: `3`,
        }}
      >
        {formatDistance(new Date(songTimestamp), new Date())} ago
      </div>
      <div
        sx={{
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <Clap />
        <span sx={{ fontSize: `3`, ml: `2` }}>{claps}</span>
      </div>
    </Fragment>
  )
}

export default SongMenu
