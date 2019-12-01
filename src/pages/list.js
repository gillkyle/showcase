/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import Underline from "../components/underlined-text"

export default ({ data }) => {
  const { allPrismicSong } = data

  return (
    <Layout>
      <Container>
        <div sx={{ mt: `6`, mx: `3` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `2` }}>
            <Underline>Latest Picks</Underline>
          </h2>
          <p
            sx={{
              textAlign: `center`,
              fontSize: `2`,
              color: `textMuted.0`,
              mb: `5`,
            }}
          >
            The latest tracks that have been reviewed and highlighted.
          </p>
          <Grid width={160} columns={3} gap={[`3`, 48]}>
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
          </Grid>
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
