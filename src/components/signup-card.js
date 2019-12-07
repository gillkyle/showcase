/** @jsx jsx */
import { jsx } from "theme-ui"

import SignupForm from "./signup-form"

const SignupCard = () => {
  return (
    <section sx={{ my: `6`, display: `flex`, justifyContent: `center` }}>
      <div
        sx={{
          backgroundColor: `card`,
          p: `5`,
          maxWidth: 620,
          display: `grid`,
          gridTemplateColumns: [`1fr`, `1fr 1fr`],
          gridGap: `3`,
          alignItems: `flex-start`,
          borderRadius: `2`,
        }}
      >
        <div>
          <h3
            sx={{
              fontSize: `5`,
              m: 0,
              mb: `2`,
              display: `flex`,
              alignItems: `center`,
            }}
          >
            Sign up for the Newsletter
          </h3>
          <p
            sx={{
              fontSize: `2`,
              color: `textMuted.0`,
              width: `85%`,
              mb: 0,
            }}
          >
            Be the first to know about the latest premieres and releases.
          </p>
        </div>
        <div sx={{ display: `flex` }}>
          <SignupForm />
        </div>
      </div>
    </section>
  )
}

export default SignupCard
