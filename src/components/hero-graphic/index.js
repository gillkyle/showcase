/** @jsx jsx */
import { jsx } from "theme-ui"
import { motion } from "framer-motion"

import Input from "./Input"
import Center from "./Center"
import Output from "./Output"

const AnimatedDot = () => (
  <motion.div
    sx={{
      position: `relative`,
      width: 5,
      height: 5,
      backgroundColor: `primary`,
      borderRadius: 100,
      zIndex: 0,
    }}
    initial={{ x: -6 }}
    animate={{ x: 3 }}
    transition={{
      loop: Infinity,
      duration: 0.3,
      ease: "linear",
    }}
  />
)

const HeroGraphic = ({ ...props }) => {
  return (
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: `2fr 32px 1fr 32px 2fr`,
      }}
      {...props}
    >
      <div
        sx={{
          display: `flex`,
          height: `100%`,
          justifyContent: `flex-end`,
          position: `relative`,
          zIndex: 2,
        }}
      >
        <div sx={{ p: `3`, position: `relative` }}>
          <Input style={{ zIndex: 1, position: `relative` }} />
          <div
            sx={{
              position: `absolute`,
              height: `100%`,
              width: `calc(100% - 70px)`,
              zIndex: 0,
              border: theme => `1px solid ${theme.colors.border}`,
              bg: `background`,
              borderRadius: `2`,
              right: 0,
              top: 0,
            }}
          ></div>
        </div>
      </div>
      <div
        sx={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <AnimatedDot />
        <AnimatedDot />
        <AnimatedDot />
        <AnimatedDot />
      </div>
      <div
        sx={{
          border: theme => `1px solid ${theme.colors.border}`,
          bg: `background`,
          borderRadius: `2`,
          display: `flex`,
          height: `100%`,
          placeItems: `center`,
          position: `relative`,
          zIndex: 2,
        }}
      >
        <div sx={{ p: `3` }}>
          <Center />
        </div>
      </div>
      <div
        sx={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <AnimatedDot />
        <AnimatedDot />
        <AnimatedDot />
        <AnimatedDot />
      </div>
      <div
        sx={{
          display: `flex`,
          height: `100%`,
          justifyItems: `center`,
        }}
      >
        <div sx={{ p: `3`, position: `relative` }}>
          <Output style={{ position: `relative`, zIndex: 1 }} />
          <div
            sx={{
              position: `absolute`,
              height: `100%`,
              width: `calc(100% - 70px)`,
              zIndex: 0,
              border: theme => `1px solid ${theme.colors.border}`,
              bg: `background`,
              borderRadius: `2`,
              left: 0,
              top: 0,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default HeroGraphic
