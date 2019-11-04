/** @jsx jsx */
import { jsx } from "theme-ui"
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
      data: { featured_track },
    },
  } = data
  const featuredTrackData = get(featured_track, `document[0].data`)
  const featuredTrackTags = get(
    featured_track,
    `document[0].data.tag_list[0].all_tags.document`
  )

  console.log(featured_track)
  console.log(featuredTrackTags)
  return (
    <Layout>
      <Container>
        <div sx={{ py: `6`, textAlign: `center` }}>
          <h1 sx={{ fontSize: `6`, mb: `2` }}>
            Curated Music the Means Something
          </h1>
          <p sx={{ margin: `0 auto`, maxWidth: `75%` }}>
            Surfacing the best music that tells deeper stories, evokes greater
            thoughts, and most of all moves us.
          </p>
        </div>
        <div>
          <h2 sx={{ fontSize: `6`, textAlign: `center` }}>Featured Track</h2>
          <Link to={`/${featured_track.uid}`} sx={{ textDecoration: `none` }}>
            <FeaturedTrack
              songData={featuredTrackData}
              tags={featuredTrackTags}
            />
          </Link>
        </div>
        <div sx={{ mt: `6` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center` }}>Latest Picks</h2>
          <div
            sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
              gridColumnGap: `4`,
              gridRowGap: `5`,
              mt: `5`,
            }}
          >
            {allPrismicSong.nodes.map(song => (
              <SongCard songId={song.uid} songData={song.data} />
            ))}
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
          album_art {
            ...AlbumArtFragment
          }
          tag_list {
            ...TagFragment
          }
        }
      }
    }
    prismicFeaturedTrack {
      id
      data {
        featured_track {
          id
          uid
          document {
            data {
              song_title
              spotify_id
              artist
              excerpt
              timestamp
              album_art {
                ...AlbumArtFragment
              }
              tag_list {
                ...TagFragment
              }
            }
          }
        }
      }
    }
  }
`
