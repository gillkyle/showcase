/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { motion } from "framer-motion"
import { graphql, Link } from "gatsby"
import { get } from "lodash"
import { FiChevronRight, FiMail } from "react-icons/fi"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import FeaturedTrack from "../components/featured-track"
import SignupForm from "../components/signup-form"
import PlayAnimation from "../components/play-animation"
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
            Curated Music that Means Something
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
              mb: `2`,
            }}
          >
            {featureTrackTitle}
          </h2>
          <p
            sx={{
              textAlign: `center`,
              fontSize: `2`,
              color: `textMuted.0`,
              margin: `0 auto`,
              maxWidth: `75%`,
            }}
          >
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
                  variant: `button.default`,
                }}
              >
                See All <FiChevronRight />
              </Link>
            </motion.div>
          </div>
        </div>
        <section sx={{ my: `6`, display: `flex`, justifyContent: `center` }}>
          <div
            sx={{
              backgroundColor: `background`,
              p: `5`,
              maxWidth: 620,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              borderColor: `border`,
              border: theme => `1px solid ${theme.colors.border}`,
            }}
          >
            <h2
              sx={{
                fontSize: `6`,
                textAlign: `center`,
                m: 0,
                mb: `2`,
                display: `flex`,
                alignItems: `center`,
              }}
            >
              <FiMail size={48} sx={{ mr: `2` }} />
              Subscribe
            </h2>
            <p
              sx={{
                textAlign: `center`,
                fontSize: `2`,
                color: `textMuted.0`,
                width: `75%`,
              }}
            >
              Get updates on the latest content and be the first to know about
              new content
            </p>
            <div
              sx={{
                height: 30,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                mb: `4`,
              }}
            >
              <PlayAnimation numBars={12} playing />
            </div>
            <SignupForm />
          </div>
        </section>
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
