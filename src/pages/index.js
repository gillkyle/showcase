/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <div>
    <div>Song Showcase</div>
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(5, 1fr)`,
      }}
    >
      {data.allPrismicSong.nodes.map(song => (
        <Link to={song.uid} sx={{ textDecoration: `none` }}>
          <div
            sx={{
              p: 3,
              my: 2,
              borderRadius: 1,
              transition: `0.3s all`,
              boxShadow: theme => `0px 2px 15px 0px ${theme.colors.shadow}`,
              "&:hover": {
                boxShadow: theme => `0px 5px 35px 0px ${theme.colors.shadow}`,
              },
            }}
          >
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
          </div>
        </Link>
      ))}
    </div>
  </div>
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
                fixed {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
