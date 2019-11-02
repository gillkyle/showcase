/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/container"
import SongCard from "../components/song-card"

export default ({ data }) => (
  <Layout>
    <Container>
      <div sx={{ py: `6`, textAlign: `center` }}>
        <h1>Music that means something.</h1>
      </div>
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
          gridColumnGap: `4`,
          gridRowGap: `5`,
        }}
      >
        {data.allPrismicSong.nodes.map(song => (
          <SongCard song={song} />
        ))}
      </div>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    allPrismicSong {
      nodes {
        uid
        data {
          artist
          song_title
          timestamp
          spotify_id
          album_art {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          tag_list {
            all_tags {
              document {
                data {
                  bg_color
                  name
                  text_color
                }
              }
            }
          }
        }
      }
    }
  }
`
