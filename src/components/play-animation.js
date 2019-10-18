/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import { keyframes } from "@emotion/core"

import { useInterval } from "../hooks/useInterval"

const sound = keyframes`
0% {
  opacity: 0.35;
  height: 05%;
}
100% {
  opacity: 1;
  height: 45%;
}
`

const PlayAnimation = ({ playing }) => {
  const NUM_BARS = 60
  let [variance, setVariance] = useState(20)
  useInterval(() => {
    setVariance(Math.floor(Math.random() * 50) + 1)
  }, 750)
  console.log(variance)

  return (
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: `repeat(${NUM_BARS}, 5px)`,
        height: `100%`,
        gridGap: `1px`,
        alignItems: `center`,
      }}
    >
      {Array(NUM_BARS)
        .fill(null)
        .map((value, index) => {
          return <Bar index={index} playing={playing} />
        })}
    </div>
  )
}

export default PlayAnimation

const Bar = ({ index, playing }) => {
  return (
    <div
      sx={{
        height: `05%`,
        width: `100%`,
        backgroundColor: `primary`,
        borderRadius: `0`,
        animation: playing && `${sound} 1s ease-in-out infinite alternate`,
        animationDuration: `${index + 600}ms`,
      }}
    />
  )
}
