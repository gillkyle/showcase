/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import Container from "../components/container"

const Layout = ({ children }) => (
  <div
    sx={{
      height: `100%`,
      minHeight: `100vh`,
      backgroundColor: `background`,
      backgroundImage: theme => `radial-gradient(${theme.colors.faint} 1px, transparent 1px),
      radial-gradient(${theme.colors.faint} 1px, transparent 1px)`,
      backgroundPosition: `0 0, 25px 25px`,
      backgroundAttachment: `fixed`,
      backgroundSize: `50px 50px`,
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
        <Link
          sx={{ textDecoration: `none`, color: `white`, fontSize: `2` }}
          to="/"
        >
          AUDIO <span sx={{ variant: `gradient.text` }}>• KINETICS</span>
        </Link>
      </Container>
    </footer>
  </div>
)

export default Layout
