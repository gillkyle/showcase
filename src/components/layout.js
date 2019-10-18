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
        borderBottom: `1px solid`,
        borderBottomColor: `border`,
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
      <SVG sx={{ position: `absolute`, minWidth: `100vw`, mt: 1 }} />
      <Container>{children}</Container>
      <SVG
        sx={{
          zIndex: -1,
          transform: `scaleY(-1)`,
          minWidth: `100vw`,
        }}
      />
    </main>
    <footer
      sx={{
        p: 4,
        borderTop: `1px solid`,
        borderTopColor: `border`,
      }}
    >
      <Container>
        <Link to="/">Music</Link>
      </Container>
    </footer>
  </div>
)

export default Layout
