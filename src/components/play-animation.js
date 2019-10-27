/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"

import { useInterval } from "../hooks/useInterval"

const BarHeights = [
  75,
  80,
  90,
  100,
  100,
  100,
  95,
  80,
  50,
  75,
  70,
  60,
  40,
  30,
  25,
  25,
  40,
  50,
  60,
  80,
  75,
  55,
  40,
  30,
  20,
  50,
  25,
  60,
  60,
  50,
  30,
]

const PlayAnimation = ({ playing }) => {
  const NUM_BARS = 60

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
      {BarHeights.map((value, index) => {
        return (
          <Bar key={index} maxHeight={value} index={index} playing={playing} />
        )
      })}
    </div>
  )
}

export default PlayAnimation

const Bar = ({ index, playing, maxHeight }) => {
  let [newHeight, setNewHeight] = useState(5)

  useInterval(() => {
    if (playing) {
      setNewHeight(Math.floor(Math.random() * maxHeight) + 5)
    }
  }, Math.random() * 300)

  return (
    <div
      sx={{
        height: playing ? `${newHeight}%` : `5%`,
        width: `100%`,
        backgroundColor: `primary`,
        borderRadius: `0`,
        transition: `0.3s all`,
      }}
    />
  )
}
