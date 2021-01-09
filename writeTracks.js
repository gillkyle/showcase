// run this file with the command: `node writeTracks` to write out data to the tracks.json file from Spotify
// it collects data for all tracks in the playlist with the id listed below which corresponds to my emotion. playlist
const SpotifyWebApi = require("spotify-web-api-node")
const fs = require("fs")
const trackItems = require(`./data/tracks.json`)
require("dotenv").config()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:5071/spotify",
})

// set the access token (can get new one in UI here: https://developer.spotify.com/console/get-playlist/?playlist_id=&market=&fields=)
// this needs to be replaced when used
const REFRESH_TOKEN = `BQBfxu4jvgtCr4EUAHR36MfVKrKqe0bvaOKM9gyhE7vVXwYQAxCHty4Eyz_dk4O7jNFgDbzXkcQt_pdn4cyZSzhg1VXWFIFSbeuwxb-LIQR7g6JDEmVUCrcK7lvWy_kb_75cn0kbcc9RUKGk`
spotifyApi.setAccessToken(REFRESH_TOKEN)

// get blog playlist
spotifyApi.getPlaylist(`6gJdqmvRKCIhqVctijLaak`).then(
  data => {
    const {
      body: {
        tracks: { items },
      },
    } = data
    let count = 0
    console.log(`---- FOUND ${items.length} TRACKS ----`)
    let trackDictionary = trackItems
    items.forEach(item => {
      // add to dictionary if not already found
      if (!trackDictionary[item.track.id]) {
        count += 1
        trackDictionary[item.track.id] = {
          id: item.track.id,
          name: item.track.name,
          aritst: item.track.artists[0].name,
          popularity: item.track.popularity,
          preview_url: item.track.preview_url,
          duration_ms: item.track.duration_ms,
          explicit: item.track.explicit,
          album_art: item.track.album.images[0].url,
        }
      }
    })
    fs.writeFileSync("./data/tracks.json", JSON.stringify(trackDictionary))
    console.log(`---- ADDED ${count} NEW TRACKS ----`)
  },
  err => {
    console.log("Something went wrong with your request:", err)
  }
)
