/** @jsx jsx */
import { jsx } from "theme-ui"

import AlbumArt from "./album-art"
import Tag from "./tag"

const FeaturedTrack = ({ songData, tags }) => {
  return (
    <div
      sx={{
        display: `flex`,
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
        <AlbumArt fluid={songData.album_art.localFile.childImageSharp.fluid} />
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
          <h1 sx={{ fontSize: `6`, mb: `1` }}>{songData.song_title}</h1>
          <div
            sx={{
              fontSize: `5`,
              color: `primaryMuted`,
              mb: `4`,
              variant: `gradient.text`,
            }}
          >
            {songData.artist}
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
  )
}

export default FeaturedTrack
