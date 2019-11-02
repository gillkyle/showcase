/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"

import AlbumArt from "./album-art"
import Tag from "./tag"
import SongMenu from "./song-menu"

const SongHeader = ({ song, tags, authorName }) => {
  return (
    <Fragment>
      {/* wide screen view */}
      <div
        sx={{
          display: [`none`, `none`, `flex`],
          mt: `5`,
          position: `relative`,
          justifyContent: `center`,
          minHeight: 280,
        }}
      >
        <div
          sx={{
            position: `absolute`,
            width: `25%`,
            left: 0,
            bottom: 20,
            borderRadius: `1`,
          }}
        >
          <AlbumArt fluid={song.album_art.localFile.childImageSharp.fluid} />
        </div>
        <div
          sx={{
            backgroundColor: `card`,
            borderRadius: `2`,
            p: `4`,
            width: `70%`,
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <div sx={{ pl: `6` }}>
            <h1 sx={{ fontSize: `6`, mb: `1` }}>{song.song_title}</h1>
            <div
              sx={{
                fontSize: `5`,
                color: `primaryMuted`,
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
              {tags && tags.map((tag, index) => <Tag key={index} tag={tag} />)}
            </div>
          </div>
        </div>
      </div>
      {/* smaller screen layout */}
      <div
        sx={{
          mt: `4`,
          display: [`grid`, `grid`, `none`],
          gridTemplateColumns: [`5% 1fr 5%`, `150px 1fr 150px`],
        }}
      >
        <div />
        <div
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            flexDirection: `row`,
          }}
        >
          <div
            sx={{
              width: 235,
              backgroundColor: `card`,
              px: `3`,
              pb: `3`,
            }}
          >
            <AlbumArt
              sx={{ transform: `translateY(-20px)` }}
              fluid={song.album_art.localFile.childImageSharp.fluid}
            />
            <div
              sx={{
                color: `white`,
                fontSize: 4,
              }}
            >
              {song.song_title}
            </div>
            <div
              sx={{
                fontSize: 3,
                variant: `gradient.text`,
              }}
            >
              {song.artist}
            </div>
          </div>
          <div
            sx={{
              ml: `4`,
              flexDirection: [`row`, `column`, null],
              color: `textMuted.0`,
              "*+*": {
                mt: `3`,
              },
            }}
          >
            <SongMenu authorName={authorName} songTimestamp={song.timestamp} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SongHeader
