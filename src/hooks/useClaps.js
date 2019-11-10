import { get } from "lodash"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const SongStatsQuery = gql`
  query FindSongStatById($spotifyId: String!) {
    songStatsBySpotifyId(spotifyId: $spotifyId) {
      data {
        _id
        spotifyId
        claps
      }
    }
  }
`

export function useQueryClapsById(spotifyId) {
  const { data, loading } = useQuery(SongStatsQuery, {
    variables: { spotifyId },
  })

  return {
    claps: get(data, `songStatsBySpotifyId.data[0].claps`, 0),
    id: get(data, `songStatsBySpotifyId.data[0]._id`),
    loading,
  }
}
