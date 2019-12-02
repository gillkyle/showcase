const getArtistUrl = artistName => {
  return artistName.toLowerCase().replace(/[^A-Z0-9]/gi, "-")
}

module.exports = getArtistUrl
