const SpotifyWebApi = require("spotify-web-api-node")
require("dotenv").config()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:5071/spotify",
})

// set the access token (can get new one in UI here: https://developer.spotify.com/console/get-playlist/?playlist_id=&market=&fields=)
// this needs to be replaced when used
const REFRESH_TOKEN = `BQB9tBnzo6pQCtEmoWIt-bmgGFfk3WUY6f0nc1YzRcPVVAiSjD4wrZSV8aD3Jq6YomtopNuWp7XosLxt2uneDu2P9HjK3F7EqlqwBpFvB1y_L20jzfbYdH2LztqBwXahs5cEGAL8fkdrChErwgk`
spotifyApi.setAccessToken(REFRESH_TOKEN)

// get blog playlist
spotifyApi.getPlaylist(`6gJdqmvRKCIhqVctijLaak`).then(
  data => {
    const {
      body: {
        tracks: { items },
      },
    } = data
    console.log(items)
  },
  err => {
    console.log("Something went wrong with your request:", err)
  }
)
