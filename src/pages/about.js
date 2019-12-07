/** @jsx jsx */
import { jsx } from "theme-ui"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Container from "../components/container"
import Underline from "../components/underlined-text"
import ArtistLink from "../components/artist-link"

export default () => {
  return (
    <Layout>
      <Container>
        <div
          sx={{
            my: [`3`, `6`],
            mx: `3`,
          }}
        >
          <h1
            sx={{
              fontSize: `6`,
              mb: `2`,
              textAlign: `center`,
            }}
          >
            <Underline>About</Underline>
          </h1>
          <div sx={{ margin: `0 auto`, maxWidth: 700 }}>
            <p>Hey friends, readers, and followers,</p>
            <p>
              To start, thanks for following along. Whether this is your first
              time on the site or you've been reading since Day 1, I appreciate
              you checking in.
            </p>
            <p>To answer the question of why the name? ...</p>
            <p>
              I started this site as a way to share really amazing tracks that
              had an additional story or reason to listen to them. A lot of
              songs tell really beautiful stories through lyrics like{" "}
              <ArtistLink artistName="Twenty One Pilots" fontSize={[`2`, `2`]}>
                Twenty One Pilots
              </ArtistLink>
              , or through ridiculously well produced synthesizers like{" "}
              <ArtistLink artistName="Porter Robinson" fontSize={[`2`, `2`]}>
                Porter Robinson
              </ArtistLink>
              .
            </p>
            <p>
              I think there's a disconnect in the music world from listeners in
              the hip hop, electronic, or even ambient or folk scenes in
              understanding why music across other styles is so special. Hip hop
              could focus on lyrics and flow where a dance track might be made
              by one snare, it's hard to see why unless it's really spelled out
              though. That's why I think showcasing the best tracks from across
              genres that actually mean something can go a long way in helping
              bridge gaps between listening styles from everyone out there.
            </p>
            <p>Happy listening and thanks for checking in,</p>
            <p>- Kyle</p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
