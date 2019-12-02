/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import Underline from "../components/underlined-text"

const ArtistTemplate = ({
  pageContext: { name: artist },
  data: { allPrismicSong },
}) => {
  return (
    <Layout>
      <Container>
        <div sx={{ mt: `6`, mx: `3` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `4` }}>
            <Underline>{artist}</Underline>
          </h2>
          <p
            sx={{
              textAlign: `center`,
              fontSize: `4`,
              color: `textMuted.0`,
              mb: `5`,
            }}
          >
            <span sx={{ fontWeight: 700, color: `primary` }}>
              {allPrismicSong.nodes.length}
            </span>{" "}
            songs by "{artist}"
          </p>
          <Grid width={160} columns={3} gap={[`3`, 48]}>
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
            <div />
            <div />
            <div />
          </Grid>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($name: String) {
    allPrismicSong(filter: { data: { artist: { eq: $name } } }) {
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

export default ArtistTemplate
