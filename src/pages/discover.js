/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import { get } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { FiExternalLink } from "react-icons/fi"

import AlbumArt from "../components/album-art"
import ArtistLink from "../components/artist-link"
import Layout from "../components/layout"
import Container from "../components/container"
import Tag from "../components/tag"
import SongCard from "../components/song-card"
import SongGrid from "../components/song-grid"
import SmallClap from "../components/small-clap"
import { getTags } from "../utils/get-tags"
import Underline from "../components/underlined-text"
import SEO from "../components/seo"

const decorativeBeforeStyles = {
  height: 75,
  width: 75,
  transform: `translate(-16px,-16px)`,
  position: `absolute`,
  content: `""`,
  zIndex: -1,
}
const indexEvaluator = num => {
  if (num === 0) {
    return `primary`
  } else if (num === 1) {
    return `secondary`
  } else {
    return null
  }
}

const getSongTag = song => {
  return get(song, "data.tag_list[0].all_tags.document[0].data.name")
}
const getSongSecondaryTag = song => {
  return get(song, "data.tag_list[1].all_tags.document[0].data.name")
}
const getTagName = tag => {
  return get(tag, "data.name")
}

const MostClappedQuery = gql`
  query MostClapped {
    mostClapped(_size: 10) {
      data {
        claps
        spotifyId
      }
    }
  }
`

const AllSongStatsQuery = gql`
  query AllSongStats {
    allSongStats(_size: 25) {
      data {
        _id
        spotifyId
        claps
      }
    }
  }
`

export default ({ data }) => {
  const { allPrismicTag, allPrismicSong } = data
  const { data: allSongStatsData, loading: loadingAllSongs } = useQuery(
    AllSongStatsQuery
  )
  const { data: mostClappedData, loading: loadingMostClapped } = useQuery(
    MostClappedQuery
  )

  const mostClappedIds = !loadingMostClapped
    ? mostClappedData.mostClapped.data.map(song => song.spotifyId)
    : []
  // match IDs returned from Fauna with data page
  let mostClapped = new Array(10).fill(null)
  // create a dictionary for songs by tag
  const tagBank = {}
  // fill the tagBank with each tag
  allPrismicTag.nodes.forEach(tag => {
    tagBank[getTagName(tag)] = []
  })
  // load up tagBank with all Songs
  allPrismicSong.nodes.forEach(song => {
    tagBank[getSongTag(song)].push(song)
    // if song is part of the most clapped list, add it to mostClapped
    if (mostClappedIds.includes(song.data.spotify_id)) {
      const index = mostClappedIds.indexOf(song.data.spotify_id)
      mostClapped[index] = {
        claps: mostClappedData.mostClapped.data[index].claps,
        uid: song.uid,
        ...song.data,
      }
    }
    // if it has a second tag include it in another list
    if (getSongSecondaryTag(song)) {
      tagBank[getSongSecondaryTag(song)].push(song)
    }
  })

  mostClapped = mostClapped.filter(Boolean)

  return (
    <Layout>
      <SEO title="Discover" />
      <Container>
        <div sx={{ mt: [`3`, `6`], mx: `3` }}>
          <h1
            sx={{
              fontSize: `6`,
              mb: `2`,
              textAlign: `center`,
            }}
          >
            <Underline>Discover</Underline>
          </h1>
          <section sx={{ position: `relative`, zIndex: 0 }}>
            <h2 sx={{ fontSize: `5`, mb: `2` }}>Highest Rated</h2>
            <p sx={{ fontSize: `3`, color: `textMuted.0`, mb: `4` }}>
              See what members of the community are enjoying most with the list
              of most upvoted tracks across the whole site.
            </p>
            {!loadingMostClapped
              ? mostClapped.map((song, index) => {
                  const tags = getTags(song)
                  return (
                    <div
                      sx={{
                        display: `grid`,
                        gridTemplateColumns: [
                          `180px  2fr 60px`,
                          `100px  2fr 2fr 1fr 100px`,
                        ],
                        gridTemplateAreas: [
                          `
                        "art title title"
                        "art link link"
                        "art tags clap"
                      `,
                          `
                          "art title tags link clap"
                        `,
                        ],
                        alignItems: `center`,
                        backgroundColor: `card`,
                        borderRadius: `2`,
                        my: `3`,
                        p: `2`,
                        zIndex: 2,
                        "&::before": {
                          ...decorativeBeforeStyles,
                          backgroundColor: indexEvaluator(index),
                          borderRadius: `2`,
                        },
                      }}
                    >
                      <div
                        sx={{
                          gridArea: `art`,
                          width: [160, 80],
                          height: [160, 80],
                        }}
                      >
                        <AlbumArt
                          fluid={song.album_art.localFile.childImageSharp.gatsbyImageData}
                        />
                      </div>

                      <div>
                        <div
                          sx={{
                            gridArea: `title`,
                            display: `flex`,
                            flexDirection: `column`,
                          }}
                        >
                          <span sx={{ fontSize: `4`, mb: `1` }}>
                            {song.song_title}{" "}
                            <span sx={{ fontSize: `3`, color: `textMuted.1` }}>
                              #{index + 1}
                            </span>
                          </span>
                          <span sx={{ variant: `gradient.text` }}>
                            <ArtistLink artistName={song.artist} fontSize={`2`}>
                              {song.artist}
                            </ArtistLink>
                          </span>
                        </div>
                      </div>
                      <div sx={{ gridArea: `tags` }}>
                        {tags &&
                          tags.map((tag, index) => {
                            return <Tag small key={index} tag={tag[0]} />
                          })}
                      </div>
                      <div sx={{ gridArea: `link`, my: [`2`, null] }}>
                        <Link
                          to={`/${song.uid}`}
                          sx={{
                            variant: `button.link`,
                            whiteSpace: `nowrap`,
                          }}
                        >
                          View Track{" "}
                          <FiExternalLink size={16} sx={{ ml: `2` }} />
                        </Link>
                      </div>
                      <div sx={{ gridArea: `clap` }}>
                        <SmallClap fill="textMuted.0" numClaps={song.claps} />
                      </div>
                    </div>
                  );
                })
              : Array(10)
                  .fill()
                  .map((_, index) => (
                    <div
                      sx={{
                        height: 80,
                        display: `grid`,
                        gridTemplateColumns: `100px  2fr 2fr 1fr 100px`,
                        alignItems: `center`,
                        backgroundColor: `card`,
                        my: `3`,
                        p: `2`,
                        zIndex: 2,
                        "&::before": {
                          ...decorativeBeforeStyles,
                          backgroundColor: indexEvaluator(index),
                        },
                      }}
                    >
                      Loading...
                    </div>
                  ))}
          </section>
          <section>
            <h2 sx={{ fontSize: `5`, mt: `6`, mb: `2` }}>Tags</h2>
            <p sx={{ fontSize: `3`, color: `textMuted.0`, mb: `4` }}>
              Find songs based off of genres you like or that overlap with your
              taste. Genres aren't always the best for categorizing sound, but
              they serve as a good starting point.
            </p>
            {allPrismicTag.nodes.map((tag, index) => (
              <div sx={{ mt: `5` }}>
                <div
                  sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    mb: `4`,
                  }}
                >
                  <h3
                    sx={{
                      fontSize: `4`,
                      m: 0,
                      textTransform: `uppercase`,
                      display: `flex`,
                      alignItems: `center`,
                      "& *+*": {
                        ml: `2`,
                      },
                    }}
                  >
                    <span sx={{ color: tag.data.bg_color }}>•</span>
                    <span>{tag.data.name}</span>
                    <span sx={{ color: tag.data.bg_color }}>•</span>
                    <span
                      sx={{
                        fontSize: `3`,
                        color: `textMuted.1`,
                        ml: `2`,
                        verticalAlign: `middle`,
                      }}
                    >
                      ({tagBank[getTagName(tag)].length})
                    </span>
                  </h3>
                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      to={`/tag/${tag.data.name.toLowerCase()}`}
                      sx={{
                        variant: `button.default`,
                        height: `3`,
                        fontSize: `2`,
                      }}
                    >
                      View All
                    </Link>
                  </motion.div>
                </div>
                <SongGrid>
                  {tagBank[getTagName(tag)].map((song, index) => {
                    if (index > 3) {
                      return
                    } else {
                      return (
                        <SongCard
                          key={song.uid}
                          songId={song.uid}
                          songData={song.data}
                        />
                      )
                    }
                  })}
                </SongGrid>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query {
    allPrismicTag {
      nodes {
        id
        data {
          name
          bg_color
          text_color
        }
      }
    }
    # it would be helpful to make a group here  but pulling data from
    # Prismic with multiple tag support doesn't look possible
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
