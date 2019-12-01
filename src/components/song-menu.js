/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { formatDistance } from "date-fns"

import Clap from "./clap"
import { useQueryClapsById } from "../hooks/useClaps"
import Loading from "./loading"

const SongMenu = ({ spotifyId, songTimestamp, authorName }) => {
  const { claps, id, loading } = useQueryClapsById(spotifyId)

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
          mb: 36,
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
        {!loading ? (
          <Clap spotifyId={spotifyId} id={id} claps={claps} />
        ) : (
          <Loading />
        )}
      </div>
    </Fragment>
  )
}

export default SongMenu
