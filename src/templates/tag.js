/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import Underline from "../components/underlined-text"

const TagTemplate = ({
  pageContext: { name: tagName },
  data: { allPrismicSong },
}) => {
  return (
    <Layout>
      <Container>
        <div sx={{ mt: `6`, mx: `3` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `4` }}>
            <Underline>{tagName}</Underline>
          </h2>
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
  query($name: String) {
    allPrismicSong(
      filter: {
        data: {
          tag_list: {
            elemMatch: {
              all_tags: {
                document: { elemMatch: { data: { name: { eq: $name } } } }
              }
            }
          }
        }
      }
    ) {
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

export default TagTemplate
