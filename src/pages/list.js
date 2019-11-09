/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import FeaturedTrack from "../components/featured-track"

export default ({ data }) => {
  const { allPrismicSong } = data

  return (
    <Layout>
      <Container>
        <div sx={{ mt: `6` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center` }}>Latest Picks</h2>
          <div
            sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
              gridColumnGap: `3`,
              gridRowGap: `5`,
              mt: `5`,
            }}
          >
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
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
