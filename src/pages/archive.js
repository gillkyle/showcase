/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import SongGrid from "../components/song-grid"
import Underline from "../components/underlined-text"
import SEO from "../components/seo"

export default ({ data }) => {
  const { allPrismicSong } = data

  return (
    <Layout>
      <SEO title="Archive" />
      <Container>
        <div sx={{ mt: [`3`, `6`], mx: `3` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `2` }}>
            <Underline>Archive</Underline>
          </h2>
          <p
            sx={{
              textAlign: `center`,
              fontSize: `2`,
              color: `textMuted.0`,
              mb: `5`,
            }}
          >
            All tracks that have been reviewed and highlighted historically.
          </p>
          <SongGrid>
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
          </SongGrid>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPrismicSong(sort: { fields: data___song_title }) {
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
