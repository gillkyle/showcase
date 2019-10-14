/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children }) => (
  <div
    sx={{
      maxWidth: 960,
      margin: `0 auto`,
    }}
  >
    {children}
  </div>
)

export default Container
