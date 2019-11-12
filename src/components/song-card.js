/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import { get } from "lodash"

import AlbumArt from "./album-art"
import Tag from "./tag"

const SongCard = ({ songData, songId }) => {
  const tags = get(songData, `tag_list[0].all_tags.document`)

  return (
    <div
      sx={{
        justifySelf: `center`,
        display: `flex`,
        flexDirection: `column`,
        backgroundColor: `card`,
        width: [`75%`, `100%`],
        px: `3`,
        pb: `3`,
      }}
    >
      <Link to={`/${songId}`} sx={{ textDecoration: `none` }}>
        <motion.div whileHover={{ y: -3 }} sx={{}}>
          <AlbumArt
            sx={{ transform: `translateY(-20px)` }}
            fluid={songData.album_art.localFile.childImageSharp.fluid}
          />
        </motion.div>
      </Link>

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
      <div
        sx={{
          height: `100%`,
          display: `flex`,
          alignItems: `flex-end`,
          mt: `3`,
        }}
      >
        {tags && tags.map((tag, index) => <Tag key={index} tag={tag} small />)}
      </div>
    </div>
  )
}

export default SongCard
