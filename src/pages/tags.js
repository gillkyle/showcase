/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
import Container from "../components/container"
import Tag from "../components/tag"
import SongCard from "../components/song-card"

const getSongTag = song => {
  return get(song, "data.tag_list[0].all_tags.document[0].data.name")
}
const getSongSecondaryTag = song => {
  return get(song, "data.tag_list[1].all_tags.document[0].data.name")
}
const getTagName = tag => {
  return get(tag, "data.name")
}

export default ({ data }) => {
  const { allPrismicTag, allPrismicSong } = data

  const tagBank = {}
  // fill the tagBank with each tag
  allPrismicTag.nodes.forEach(tag => {
    tagBank[getTagName(tag)] = []
  })
  // load up tagBank with all Songs
  allPrismicSong.nodes.forEach(song => {
    tagBank[getSongTag(song)].push(song)
    // if it has a second tag include it in another list
    if (getSongSecondaryTag(song)) {
      tagBank[getSongSecondaryTag(song)].push(song)
    }
  })
  console.log(tagBank)

  return (
    <Layout>
      <Container>
        <div sx={{ mt: `6`, mx: [`5`, `3`] }}>
          <h2 sx={{ fontSize: `6`, textAlign: `center` }}>Tags</h2>
          {allPrismicTag.nodes.map((tag, index) => (
            <Fragment>
              <Tag key={index} tag={tag} />
              <div
                sx={{
                  display: `grid`,
                  gridTemplateColumns: `repeat(3, minmax(300px, 1fr))`,
                  gridColumnGap: `5`,
                  gridRowGap: `5`,
                  mt: `5`,
                }}
              >
                {tagBank[getTagName(tag)].map(song => {
                  return (
                    <SongCard
                      key={song.uid}
                      songId={song.uid}
                      songData={song.data}
                    />
                  )
                })}
              </div>
            </Fragment>
          ))}
        </div>
      </Container>
    </Layout>
  )
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
