import { graphql } from "gatsby"

export const tagFragment = graphql`
  fragment TagFragment on PrismicSongDataTag_list {
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
`

export const featuredTagFragment = graphql`
  fragment FeaturedTagFragment on PrismicSongDataTag_list {
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
`

export const albumArtFragment = graphql`
  fragment AlbumArtFragment on PrismicSongDataAlbum_art {
    localFile {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
