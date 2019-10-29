# Showcase

Music blog for songs with deeper meaning.

## Data

Data comes from 2 sources: Spotify and Prismic. Information stored in Prismic is the content for a song post including a timestamp, a url, album art, and the actual content written about a track. Spotify data includes info like popularity, a preview URL, and other metadata for richer experiences on the blog.

Content can be written straight inside of Prismic, including adding authors, tags, and new song posts.

The information from Spotify is stored in the tracks.json file and can be refreshed by running the `writeTracks` script at the root of the site after updating the refresh token inside of the file.
