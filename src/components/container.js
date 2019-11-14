/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children, ...props }) => (
  <div
    sx={{
      maxWidth: 960,
      margin: `0 auto`,
    }}
    {...props}
  >
    {children}
  </div>
)

export default Container
