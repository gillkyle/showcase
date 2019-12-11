/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { formatDistance } from "date-fns"

import AlbumArt from "./album-art"
import Tag from "./tag"
import Clap from "./clap"
import { useQueryClapsById } from "../hooks/useClaps"

const SongHeader = ({ song, tags, authorName }) => {
  const { claps, id, loading } = useQueryClapsById(song.spotify_id)

  return (
    <Fragment>
      {/* wide screen view */}
      <div
        sx={{
          display: [`none`, `none`, `flex`],
          backgroundColor: `card`,
          p: `4`,
          mt: `5`,
          position: `relative`,
          alignItems: `center`,
          justifyContent: `flex-start`,
          borderRadius: `3`,
        }}
      >
        <div
          sx={{
            width: `25%`,
          }}
        >
          <AlbumArt
            sx={{ borderRadius: `2` }}
            fluid={song.album_art.localFile.childImageSharp.fluid}
          />
        </div>
        <div
          sx={{
            display: `flex`,
            alignItems: `center`,
            ml: `4`,
          }}
        >
          <div>
            <h1 sx={{ fontSize: `6`, mb: `1` }}>{song.song_title}</h1>
            <div
              sx={{
                fontSize: `5`,
                mb: `4`,
                variant: `gradient.text`,
              }}
            >
              {song.artist}
            </div>
            <div
              sx={{
                display: `flex`,
              }}
            >
              {tags.map((tag, index) => (
                <Tag key={index} tag={tag[0]} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* smaller screen layout */}
      <div
        sx={{
          mt: `4`,
          display: [`grid`, `grid`, `none`],
          gridTemplateColumns: [`7.5% 1fr 7.5%`, `175px 1fr 175px`],
        }}
      >
        <div />
        <div
          sx={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
          }}
        >
          <div
            sx={{
              width: `100%`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              textAlign: `center`,
            }}
          >
            <AlbumArt
              sx={{
                width: `100%`,
                justifySelf: `center`,
                mb: `3`,
              }}
              fluid={song.album_art.localFile.childImageSharp.fluid}
            />
            <div
              sx={{
                color: `white`,
                fontSize: 5,
              }}
            >
              {song.song_title}
            </div>
            <div
              sx={{
                fontSize: 4,
                variant: `gradient.text`,
              }}
            >
              {song.artist}
            </div>
            <div
              sx={{
                mt: `2`,
                textTransform: `uppercase`,
                fontSize: `0`,
                fontWeight: `bold`,
              }}
            >
              {formatDistance(new Date(song.timestamp), new Date())} ago | by:{" "}
              <span sx={{ color: `text` }}>{authorName}</span>
            </div>
            <div
              sx={{
                display: `flex`,
                mt: `3`,
              }}
            >
              {tags &&
                tags.map((tag, index) => <Tag key={index} tag={tag[0]} />)}
            </div>
          </div>
          <div
            sx={{
              mt: `4`,
              display: `grid`,
              gridGap: `3`,
              flexDirection: `row`,
              gridTemplateColumns: `auto 1fr`,
              color: `textMuted.0`,
              alignSelf: `center`,
            }}
          >
            {!loading && (
              <Clap spotifyId={song.spotify_id} id={id} claps={claps} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SongHeader
