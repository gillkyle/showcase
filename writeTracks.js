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
const REFRESH_TOKEN = `BQCFLznZ8Itx9t-ZeW6hLw4PfjahzhhPk9HVb3eC_Zgzo503L-rl9s2YvzSp7b2Xmr0RUlwS3K9pYmVizdo-0Qbg6aLpSX3BxtPjbbM9H1Ez5bepcJbiI4I3pkhZcoovUzLGqhinrrBqRysxNS4`
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
    fs.writeFileSync("./data/tracks.json", JSON.stringify(items))
    console.log(`---- WROTE TRACKS SUCCESSFULLY ----`)
  },
  err => {
    console.log("Something went wrong with your request:", err)
  }
)
