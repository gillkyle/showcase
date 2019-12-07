/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { FiHome, FiZap, FiAward, FiUpload } from "react-icons/fi"

import theme from "../gatsby-plugin-theme-ui/index"
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
            Audio <span sx={{ variant: `gradient.text` }}>• Vault</span>
          </Link>
        </div>
        <div
          sx={{
            display: [`none`, `grid`],
            gridTemplateColumns: `repeat(4, auto)`,
            gridGap: `2`,
          }}
        >
          <Link sx={{ variant: `button.link` }} to="/new">
            NEW
          </Link>
          <Link sx={{ variant: `button.link` }} to="/discover">
            DISCOVER
          </Link>
          <Link sx={{ variant: `button.link` }} to="/submit">
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
              fontSize: `2`,
            }}
            to="/"
          >
            Audio <span sx={{ variant: `gradient.text` }}>• Vault</span>
          </Link>
        </div>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(4, auto)`,
            gridGap: `2`,
            alignItems: `center`,
          }}
        >
          <Link sx={{ variant: `button.link.faint` }} to="/archive">
            ARCHIVE
          </Link>
          ·
          <Link sx={{ variant: `button.link.faint` }} to="/about">
            ABOUT
          </Link>
        </div>
      </Container>
    </footer>
    <div
      sx={{
        bg: `background`,
        p: `2`,
        position: `fixed`,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 10001,
        display: [`flex`, `none`],
        justifyContent: `space-around`,
        borderTop: theme => `1px solid ${theme.colors.border}`,
      }}
    >
      <MobileLink to="/">
        <FiHome sx={{ mb: `1` }} size={30} />
        Home
      </MobileLink>
      <MobileLink to="/new">
        <FiZap sx={{ mb: `1` }} size={30} />
        New
      </MobileLink>
      <MobileLink to="/discover">
        <FiAward sx={{ mb: `1` }} size={30} />
        Discover
      </MobileLink>
      <MobileLink to="/submit">
        <FiUpload sx={{ mb: `1` }} size={30} />
        Submit
      </MobileLink>
    </div>
  </div>
)

export default Layout

const MobileLink = ({ children, to }) => (
  <Link
    sx={{
      color: `text`,
      fontSize: `1`,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      textDecoration: `none`,
    }}
    to={to}
    activeStyle={{ color: theme.colors.primary }}
  >
    {children}
  </Link>
)
