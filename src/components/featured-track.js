/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import { get } from "lodash"

import AlbumArt from "./album-art"
import Tag from "./tag"
import PlayButton from "./play-button"
import SmallClap from "./small-clap"
import { useQueryClapsById } from "../hooks/useClaps"

const FeaturedTrack = ({ songId, song, tags }) => {
  const songData = get(song, `document[0].data`)
  const previewUrl = get(song, `document[0].fields.previewUrl`)

  const claps = useQueryClapsById(songData.spotify_id)

  return (
    <div
      sx={{
        color: `white`,
        display: `flex`,
        mt: `5`,
        position: `relative`,
        justifyContent: `center`,
        minHeight: 280,
      }}
    >
      <Link to={`/${songId}`} sx={{ textDecoration: `none` }}>
        <motion.div
          whileHover={{
            x: 8,
          }}
          sx={{
            position: `absolute`,
            width: `35%`,
            left: 0,
            top: 36,
            borderRadius: `1`,
          }}
        >
          <AlbumArt
            fluid={songData.album_art.localFile.childImageSharp.fluid}
          />
        </motion.div>
      </Link>
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
        <div sx={{ pl: `7` }}>
          <h1 sx={{ fontSize: `6`, mb: `1` }}>{songData.song_title}</h1>
          <div
            sx={{
              fontSize: `5`,
              mb: `2`,
              variant: `gradient.text`,
            }}
          >
            {songData.artist}
          </div>
          <p
            sx={{
              fontSize: `3`,
              color: `white`,
              mb: `2`,
            }}
          >
            {songData.excerpt}
          </p>
          <div
            sx={{
              py: `2`,
              mb: `3`,
              display: `grid`,
              gridGap: `3`,
              gridTemplateColumns: `auto auto 1fr`,
              justifyContent: `center`,
            }}
          >
            <PlayButton songPreview={previewUrl} />
          </div>

          <div
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
            }}
          >
            {tags && tags.map((tag, index) => <Tag key={index} tag={tag} />)}
            <SmallClap fill="textMuted.0" numClaps={claps} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedTrack
