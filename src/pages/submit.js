/** @jsx jsx */
import { jsx } from "theme-ui"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Container from "../components/container"
import Underline from "../components/underlined-text"

export default () => {
  return (
    <Layout>
      <Container>
        <div
          sx={{
            mt: `6`,
            mx: `3`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
          }}
        >
          <h1
            sx={{
              fontSize: `6`,
              mb: `2`,
              textAlign: `center`,
            }}
          >
            <Underline>Submit</Underline>
          </h1>
          <p
            sx={{
              fontSize: `3`,
              color: `textMuted.0`,
              mb: `4`,
              textAlign: `center`,
              width: `75%`,
            }}
          >
            Want to see your song, or a song you love, featured on the site?
            Submit it here for a chance to be featured.
          </p>
          <div sx={{ my: `4`, display: `flex`, placeContent: `center` }}>
            <motion.div whileHover={{ y: -2 }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeMmlEQZ9AFHw3h2W7KCfe5mS-TXi1eckMN0zHlMALFvpA7qA/viewform?usp=sf_link"
                sx={{
                  variant: `button.default`,
                }}
              >
                Submit a Song
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
