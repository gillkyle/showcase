/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import Container from "../components/container"

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
      <Container>
        <Link to="/">Music</Link>
      </Container>
    </header>
    <main>
      <Container>{children}</Container>
    </main>
  </div>
)

export default Layout
