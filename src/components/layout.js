/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import Container from "../components/container"
import SVG from "../assets/dot-group.svg"

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
      }}
    >
      <Container>
        <Link to="/">Music</Link>
      </Container>
    </header>
    <main
      sx={{
        position: `relative`,
      }}
    >
      <Container>{children}</Container>
    </main>
    <footer
      sx={{
        p: 4,
      }}
    >
      <Container>
        <Link to="/">Music</Link>
      </Container>
    </footer>
  </div>
)

export default Layout
