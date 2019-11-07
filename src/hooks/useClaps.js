import { get } from "lodash"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const SongStatsQuery = gql`
  query FindSongStatById($spotifyId: String!) {
    songStatsBySpotifyId(spotifyId: $spotifyId) {
      data {
        spotifyId
        claps
      }
    }
  }
`

export function useQueryClapsById(spotifyId) {
  const { data } = useQuery(SongStatsQuery, {
    variables: { spotifyId },
  })

  return get(data, `songStatsBySpotifyId.data[0].claps`, 0)
}
