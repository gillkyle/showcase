import { graphql } from "gatsby"

export const tagFragment = graphql`
  fragment TagFragment on PrismicSongData {
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
`

export const songFieldsFragment = graphql`
  fragment SongFieldsFragment on PrismicSong {
    fields {
      previewUrl
      popularity
      duration
    }
  }
`

export const albumArtFragment = graphql`fragment AlbumArtFragment on PrismicSongData {
  album_art {
    localFile {
      childImageSharp {
        gatsbyImageData(layout: FLUID)
      }
    }
  }
}
`
