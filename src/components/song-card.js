/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { motion } from "framer-motion"

import AlbumArt from "./album-art"
import Tag from "./tag"
import { getTags } from "../utils/get-tags"

const SongCard = ({ songData, songId, ...props }) => {
  const tags = getTags(songData)

  return (
    <div
      sx={{
        justifySelf: `center`,
        display: `flex`,
        flexDirection: `column`,
        backgroundColor: [`transparent`, `card`],
        width: `100%`,
        p: `3`,
        borderRadius: `2`,
      }}
      {...props}
    >
      <Link to={`/${songId}`} sx={{ textDecoration: `none` }}>
        <motion.div whileHover={{ y: -3 }} sx={{ mb: `2` }}>
          <AlbumArt
            fluid={songData.album_art.localFile.childImageSharp.fluid}
          />
        </motion.div>
      </Link>

      <div
        sx={{
          color: `white`,
          fontSize: [3, 4],
        }}
      >
        {songData.song_title}
      </div>
      <div
        sx={{
          fontSize: [2, 3],
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
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag[0]} small />
        ))}
      </div>
    </div>
  )
}

export default SongCard
