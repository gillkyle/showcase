/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import { get } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Layout from "../components/layout"
import Container from "../components/container"
import Tag from "../components/tag"
import SongCard from "../components/song-card"

const getSongTag = song => {
  return get(song, "data.tag_list[0].all_tags.document[0].data.name")
}
const getSongSecondaryTag = song => {
  return get(song, "data.tag_list[1].all_tags.document[0].data.name")
}
const getTagName = tag => {
  return get(tag, "data.name")
}

const AllSongStatsQuery = gql`
  query AllSongStats {
    allSongStats(_size: 25) {
      data {
        _id
        spotifyId
        claps
      }
    }
  }
`

export default ({ data }) => {
  const { allPrismicTag, allPrismicSong } = data
  const { data: allSongStatsData, loading } = useQuery(AllSongStatsQuery)
  if (!loading) {
    console.log(allSongStatsData)
  }

  const tagBank = {}
  // fill the tagBank with each tag
  allPrismicTag.nodes.forEach(tag => {
    tagBank[getTagName(tag)] = []
  })
  // load up tagBank with all Songs
  allPrismicSong.nodes.forEach(song => {
    tagBank[getSongTag(song)].push(song)
    // if it has a second tag include it in another list
    if (getSongSecondaryTag(song)) {
      tagBank[getSongSecondaryTag(song)].push(song)
    }
  })
  console.log(tagBank)

  return (
    <Layout>
      <Container>
        <div sx={{ mt: `6`, mx: [`5`, `3`] }}>
          <h1 sx={{ fontSize: `6`, mb: `2`, textAlign: `center` }}>Discover</h1>
          <section>
            <h2 sx={{ fontSize: `5` }}>Highest Rated</h2>
            <p sx={{ fontSize: `3`, color: `textMuted.0` }}>
              See what members of the community are enjoying most with the list
              of most upvoted tracks across the whole site.
            </p>
          </section>
          <section>
            <h2 sx={{ fontSize: `5` }}>Tags</h2>
            <p sx={{ fontSize: `3`, color: `textMuted.0` }}>
              Find songs based off of genres you like or that overlap with your
              taste. Genres aren't always the best for categorizing sound, but
              they serve as a good starting point.
            </p>
            {allPrismicTag.nodes.map((tag, index) => (
              <div sx={{ mt: `5` }}>
                <div
                  sx={{
                    display: `flex`,
                    justifyContent: [`space-around`, `space-between`],
                    mb: `4`,
                  }}
                >
                  <h3 sx={{ fontSize: `4`, m: 0, textTransform: `uppercase` }}>
                    <span sx={{ color: tag.data.bg_color }}>• </span>
                    {tag.data.name}
                    <span sx={{ color: tag.data.bg_color }}> •</span>
                  </h3>
                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      to={`/tag/${tag.data.name.toLowerCase()}`}
                      sx={{
                        variant: `button.default`,
                        height: `3`,
                        fontSize: `2`,
                      }}
                    >
                      View All
                    </Link>
                  </motion.div>
                </div>
                <Grid width={250} columnns={3} gap={`5`}>
                  {tagBank[getTagName(tag)].map((song, index) => {
                    if (index > 2) return
                    return (
                      <SongCard
                        key={song.uid}
                        songId={song.uid}
                        songData={song.data}
                      />
                    )
                  })}
                </Grid>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPrismicTag {
      nodes {
        id
        data {
          name
          bg_color
          text_color
        }
      }
    }
    allPrismicSong(sort: { fields: data___timestamp, order: DESC }) {
      nodes {
        uid
        data {
          artist
          song_title
          timestamp
          spotify_id
          ...AlbumArtFragment
          ...TagFragment
        }
      }
    }
  }
`
