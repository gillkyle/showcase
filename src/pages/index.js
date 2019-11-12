/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql, Link } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import FeaturedTrack from "../components/featured-track"

export default ({ data }) => {
  const {
    allPrismicSong,
    prismicFeaturedTrack: {
      data: { featured_track: featuredTrack, title: featureTrackTitle },
    },
  } = data
  const featuredTrackTags = get(
    featuredTrack,
    `document[0].data.tag_list[0].all_tags.document`
  )
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
              color: `secondaryMuted`,
              margin: `0 auto`,
              maxWidth: `75%`,
            }}
          >
            Surfacing the best music that tells deeper stories, evokes greater
            thoughts, and most of all moves us.
          </p>
        </div>
        <div>
          <h2 sx={{ fontSize: `6`, textAlign: `center` }}>
            {featureTrackTitle}
          </h2>
          <FeaturedTrack
            songId={featuredTrack.uid}
            song={featuredTrack}
            tags={featuredTrackTags}
          />
        </div>
        <div sx={{ mt: `6`, mx: [`5`, `3`] }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center` }}>Latest Picks</h2>
          {/* <div
            sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
              gridColumnGap: `3`,
              gridRowGap: `5`,
              mt: `5`,
            }}
          > */}
          <Grid width={250} columnns={3} gap={`5`}>
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
          </Grid>
          {/* </div> */}
          <div sx={{ my: `4`, display: `flex`, placeContent: `center` }}>
            <Link
              to="/list"
              sx={{
                transition: `0.3s all`,
                textDecoration: `none`,
                fontWeight: 700,
                fontSize: `4`,
                py: `3`,
                px: `4`,
                color: `text`,
                borderRadius: `2`,
                "&:hover": {
                  backgroundColor: `card`,
                },
              }}
            >
              See All >
            </Link>
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
