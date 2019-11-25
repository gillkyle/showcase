// run this file with the command: `node writeTracks` to write out data to the tracks.json file from Spotify
// it collects data for all tracks in the playlist with the id listed below which corresponds to my emotion. playlist
const SpotifyWebApi = require("spotify-web-api-node")
const fs = require("fs")
require("dotenv").config()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:5071/spotify",
})

// set the access token (can get new one in UI here: https://developer.spotify.com/console/get-playlist/?playlist_id=&market=&fields=)
// this needs to be replaced when used
const REFRESH_TOKEN = `BQDLe2XhrwBCRcUJhFhEtfFx7BlKfuN4ALTOEZNF2n4rIr19Th7K3soh7AeykAF1MxxISxpr2JO4FJWtXv0Y7Nwex9hE_zllTnZoTU-BbL6-LAdAd50bmzTwI_PN1vwakPiN6tvqp3DEpecm`
spotifyApi.setAccessToken(REFRESH_TOKEN)

// get blog playlist
spotifyApi.getPlaylist(`6gJdqmvRKCIhqVctijLaak`).then(
  data => {
    const {
      body: {
        tracks: { items },
      },
    } = data
    console.log(`---- FOUND ${items.length} TRACKS ----`)
    const pluckedItems = items.map(item => {
      return {
        track: {
          id: item.track.id,
          name: item.track.name,
          aritst: item.track.artists[0].name,
          popularity: item.track.popularity,
          preview_url: item.track.preview_url,
          duration_ms: item.track.duration_ms,
          explicit: item.track.explicit,
          album_art: item.track.album.images[0].url,
        },
      }
    })
    fs.writeFileSync("./data/tracks.json", JSON.stringify(pluckedItems))
    console.log(`---- WROTE TRACKS SUCCESSFULLY ----`)
  },
  err => {
    console.log("Something went wrong with your request:", err)
  }
)
