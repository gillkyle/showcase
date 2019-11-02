/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { motion } from "framer-motion"

import AlbumArt from "./album-art"

const SongCard = ({ songData, songId }) => {
  return (
    <div
      sx={{
        width: 235,
        backgroundColor: `card`,
        px: `3`,
        pb: `3`,
        justifySelf: `center`,
      }}
    >
      <Link to={songId} sx={{ textDecoration: `none` }}>
        <motion.div whileHover={{ y: -3 }}>
          <AlbumArt
            sx={{ transform: `translateY(-20px)` }}
            fluid={songData.album_art.localFile.childImageSharp.fluid}
          />
        </motion.div>
        <div
          sx={{
            color: `white`,
            fontSize: 4,
          }}
        >
          {songData.song_title}
        </div>
        <div
          sx={{
            fontSize: 3,
            variant: `gradient.text`,
          }}
        >
          {songData.artist}
        </div>
      </Link>
    </div>
  )
}

export default SongCard
