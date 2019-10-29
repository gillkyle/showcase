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
      }}
    >
      <Container>
        <Link
          sx={{ textDecoration: `none`, color: `white`, fontSize: `3` }}
          to="/"
        >
          AUDIO <span sx={{ variant: `gradient.text` }}>• KINETICS</span>
        </Link>
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
