/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { motion } from "framer-motion"
import { graphql, Link } from "gatsby"
import { get } from "lodash"
import { FiChevronRight } from "react-icons/fi"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import FeaturedTrack from "../components/featured-track"
import { getTags } from "../utils/get-tags"

export default ({ data }) => {
  const {
    allPrismicSong,
    prismicFeaturedTrack: {
      data: { featured_track: featuredTrack, title: featureTrackTitle },
    },
  } = data
  const featuredTrackTags = getTags(get(featuredTrack, `document[0].data`))

  return (
    <Layout>
      <Container>
        <div sx={{ py: `6`, textAlign: `center` }}>
          <h1 sx={{ fontSize: `6`, mb: `2` }}>
            Curated Music the Means Something
          </h1>
          <p
            sx={{
              fontSize: `3`,
              color: `textMuted.0`,
              margin: `0 auto`,
              maxWidth: `75%`,
            }}
          >
            Surfacing the best music that tells deeper stories, evokes greater
            thoughts, and most of all moves us.
          </p>
        </div>
        <div>
          <h2
            sx={{
              fontSize: `6`,
              textAlign: `center`,
              mb: `3`,
            }}
          >
            {featureTrackTitle}
          </h2>
          <p sx={{ textAlign: `center`, fontSize: `2`, color: `textMuted.0` }}>
            One of our favorite tracks right now that's worth highlighting.
          </p>
          <FeaturedTrack
            songId={featuredTrack.uid}
            song={featuredTrack}
            tags={featuredTrackTags[0]}
          />
        </div>
        <div sx={{ mt: `6`, mx: [`5`, `3`] }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `2` }}>
            Latest Picks
          </h2>
          <p
            sx={{
              textAlign: `center`,
              fontSize: `2`,
              color: `textMuted.0`,
              mb: `5`,
            }}
          >
            The latest tracks reviewed and highlighted on Audio • Kinetics.
          </p>
          <Grid width={250} columnns={3} gap={`5`}>
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
          </Grid>
          <div sx={{ my: `4`, display: `flex`, placeContent: `center` }}>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/list"
                sx={{
                  variant: `gradient.button`,
                  transition: `0.3s all`,
                  textDecoration: `none`,
                  fontWeight: 700,
                  fontSize: `4`,
                  py: `3`,
                  px: `4`,
                  color: `text`,
                  borderRadius: `2`,
                  display: `flex`,
                  alignItems: `center`,
                }}
              >
                See All <FiChevronRight size={30} />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPrismicSong(limit: 3, sort: { fields: data___timestamp, order: DESC }) {
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
    prismicFeaturedTrack {
      id
      data {
        title
        featured_track {
          id
          uid
          document {
            ...SongFieldsFragment
            data {
              song_title
              spotify_id
              artist
              excerpt
              timestamp
              ...AlbumArtFragment
              ...TagFragment
            }
          }
        }
      }
    }
  }
`
