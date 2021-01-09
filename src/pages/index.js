/** @jsx jsx */
import { jsx } from "theme-ui"
import { motion } from "framer-motion"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { get } from "lodash"
import { FiChevronRight } from "react-icons/fi"

import Layout from "../components/layout"
import Container from "../components/container"
import HeroGraphic from "../components/hero-graphic"
import SongCard from "../components/song-card"
import SongGrid from "../components/song-grid"
import FeaturedTrack from "../components/featured-track"
import SignupCard from "../components/signup-card"
import Underline from "../components/underlined-text"
import SEO from "../components/seo"
import { getTags } from "../utils/get-tags"

export default ({ data }) => {
  const {
    allPrismicSong,
    prismicFeaturedTrack: {
      data: { featured_track: featuredTrack, title: featureTrackTitle },
    },
    heroImage,
  } = data
  const featuredTrackTags = getTags(get(featuredTrack, `document[0].data`))

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <div sx={{ py: [`4`, `6`], textAlign: `center` }}>
          <h1 sx={{ fontSize: `6`, mb: `2` }}>
            Curated Music that <br sx={{ display: [`flex`, `flex`, `none`] }} />
            <Underline>Means Something</Underline>
          </h1>
          <p
            sx={{
              fontSize: `3`,
              color: `textMuted.0`,
              margin: `0 auto`,
              maxWidth: `75%`,
            }}
          >
            Surfacing the best music that tells deeper stories, evokes greater
            thoughts, and most of all moves us.
          </p>
          <HeroGraphic sx={{ mt: `4`, display: [`none`, `none`, `grid`] }} />
          <GatsbyImage
            image={heroImage.childImageSharp.gatsbyImageData}
            sx={{ mt: `4`, display: [`inherit`, `inherit`, `none`], mx: `3` }} />
        </div>
        <div>
          <h2
            sx={{
              fontSize: `6`,
              textAlign: `center`,
              mb: `2`,
            }}
          >
            {featureTrackTitle}
          </h2>
          <p
            sx={{
              textAlign: `center`,
              fontSize: `2`,
              color: `textMuted.0`,
              margin: `0 auto`,
              maxWidth: `75%`,
            }}
          >
            One of our favorite tracks right now that's worth highlighting.
          </p>
          <FeaturedTrack
            songId={featuredTrack.uid}
            song={featuredTrack}
            tags={featuredTrackTags[0]}
          />
        </div>
        <div sx={{ mt: `6`, mx: `3` }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center`, mb: `2` }}>
            Latest Picks
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
          <SongGrid>
            {allPrismicSong.nodes.map(song => (
              <SongCard key={song.uid} songId={song.uid} songData={song.data} />
            ))}
          </SongGrid>
          <div sx={{ my: `4`, display: `flex`, placeContent: `center` }}>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/new"
                sx={{
                  variant: `button.default`,
                }}
              >
                See All <FiChevronRight sx={{ ml: `1`, strokeWidth: 3 }} />
              </Link>
            </motion.div>
          </div>
        </div>
        <SignupCard />
      </Container>
    </Layout>
  );
}

export const query = graphql`{
  allPrismicSong(limit: 4, sort: {fields: data___timestamp, order: DESC}) {
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
  prismicFeaturedTrack {
    id
    data {
      title
      featured_track {
        id
        uid
        document {
          ...SongFieldsFragment
          data {
            song_title
            spotify_id
            artist
            excerpt
            timestamp
            ...AlbumArtFragment
            ...TagFragment
          }
        }
      }
    }
  }
  heroImage: file(relativePath: {eq: "mobile-hero-graphic.png"}) {
    id
    childImageSharp {
      gatsbyImageData(placeholder: TRACED_SVG, layout: FLUID)
    }
  }
}
`
