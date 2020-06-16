/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"
import SongGrid from "../components/song-grid"
import Underline from "../components/underlined-text"
import SEO from "../components/seo"

const TagTemplate = ({
  pageContext: { name: tagName },
  data: { allPrismicSong },
}) => {
  return (
    <Layout>
      <SEO title={`${tagName} Songs`} />
      <Container>
        <div sx={{ mt: `6`, mx: `3` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `4` }}>
            <Underline>{tagName}</Underline>
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
            songs tagged "{tagName}"
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
