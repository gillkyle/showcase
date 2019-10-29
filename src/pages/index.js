/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Container from "../components/container"
import AlbumArt from "../components/album-art"

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
          gridGap: `4`,
        }}
      >
        {data.allPrismicSong.nodes.map(song => (
          <Link to={song.uid} sx={{ textDecoration: `none` }}>
            <motion.div
              whileHover={{ y: -3 }}
              sx={{
                display: `flex`,
                flexDirection: `column`,
                my: 2,
                borderRadius: 1,
                transition: `0.3s all`,
                width: 250,
              }}
            >
              <div sx={{ height: 220, width: 220 }}>
                <AlbumArt
                  fluid={song.data.album_art.localFile.childImageSharp.fluid}
                />
              </div>
              <span
                sx={{
                  fontSize: 3,
                  color: `primary`,
                }}
              >
                {song.data.artist}
              </span>
              <span
                sx={{
                  fontSize: 3,
                }}
              >
                {" "}
                - {song.data.song_title}
              </span>
            </motion.div>
          </Link>
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
        }
      }
    }
  }
`
