/** @jsx jsx */
import { jsx } from "theme-ui"
import { motion } from "framer-motion"

const Loading = ({ ...props }) => {
  return (
    <motion.div
      initial={{ scale: 1.0, opacity: 1 }}
      animate={{ scale: 0.9, opacity: 0.5 }}
      transition={{
        yoyo: Infinity,
        duration: 0.45,
        ease: "easeIn",
      }}
      {...props}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.7">
          <circle
            cx="30"
            cy="30"
            r="18.1818"
            stroke="#9DD0FF"
            stroke-opacity="0.5"
            stroke-width="4.54545"
          />
          <circle
            cx="30"
            cy="30"
            r="9.27273"
            stroke="#9DD0FF"
            stroke-opacity="0.75"
            stroke-width="4.54545"
          />
          <circle
            cx="30"
            cy="30"
            r="27.2727"
            stroke="#9DD0FF"
            stroke-opacity="0.25"
            stroke-width="4.54545"
          />
        </g>
      </svg>
    </motion.div>
  )
}

export default Loading
