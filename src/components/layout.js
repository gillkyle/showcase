/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const Layout = ({ children }) => (
  <div
    sx={{
      height: `100%`,
      backgroundColor: `background`,
    }}
  >
    <header
      sx={{
        padding: 3,
        borderBottom: `1px solid`,
        borderBottomColor: `border`,
      }}
    >
      <Link to="/">Music</Link>
    </header>
    <main>{children}</main>
  </div>
)

export default Layout
