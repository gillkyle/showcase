/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { FiSend } from "react-icons/fi"
import { update } from "timm"

const SignupForm = ({ nada }) => {
  const [email, setEmail] = useState(``)
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = async event => {
    event.preventDefault()
    await addToMailchimp(email)
    setEmail(``)
    setSubmitted(true)
  }

  const handleChange = event => setEmail(event.target.value)

  return submitted ? (
    <span>Thanks for signing update, you can unsubscribe at any time.</span>
  ) : (
    <form
      onSubmit={handleSubmit}
      sx={{
        display: `grid`,
        gridTemplateColumns: [`1fr`],
        gridGap: `3`,
        width: `100%`,
      }}
    >
      <span sx={{ color: `textMuted.1` }}>
        *No spam, we promise, unsubscribe anytime
      </span>
      <input
        type="email"
        placeholder="Your email"
        sx={{
          variant: `input.default`,
        }}
        onChange={handleChange}
        value={email}
      ></input>
      <button sx={{ variant: `button.default`, border: 0 }}>
        Subscribe <FiSend sx={{ transform: `rotate(45deg)` }} />
      </button>
    </form>
  )
}

export default SignupForm
