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
      // add background dots
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
      <Container
        sx={{
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
        <div>
          <Link
            sx={{
              textDecoration: `none`,
              textTransform: `uppercase`,
              color: `white`,
              fontSize: `3`,
            }}
            to="/"
          >
            Kinetic <span sx={{ variant: `gradient.text` }}>• Vault</span>
          </Link>
        </div>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(3, auto)`,
            gridGap: `2`,
          }}
        >
          <Link sx={{ variant: `button.link` }} to="/list">
            LATEST
          </Link>
          <Link sx={{ variant: `button.link` }} to="/discover">
            DISCOVER
          </Link>
          <Link sx={{ variant: `button.link` }} to="/discover">
            SUBMIT
          </Link>
        </div>
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
          sx={{
            textDecoration: `none`,
            textTransform: `uppercase`,
            color: `white`,
            fontSize: `2`,
          }}
          to="/"
        >
          Kinetic <span sx={{ variant: `gradient.text` }}>• Vault</span>
        </Link>
      </Container>
    </footer>
  </div>
)

export default Layout
