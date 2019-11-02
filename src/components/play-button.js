/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useRef, useEffect, Fragment } from "react"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { motion } from "framer-motion"

import PlayAnimation from "../components/play-animation"

const PlaySection = ({ songPreview }) => {
  const [playing, setPlaying] = useState(false)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)
  let audio

  useEffect(() => {
    audio = useRef(new Audio(songPreview))
    audio.current.onended = () => {
      setPlaying(false)
    }
    audio.current.volume = 0
    // clean up function will pause the audio when navigating to a new page
    return function cleanup() {
      audio.current.pause()
    }
  }, [])

  const fadeIn = (duration = 1000, targetVolume = 1, tick = 50) => {
    const volumeIncrease = targetVolume / (duration / tick)
    function increaseVolume() {
      const vol = Math.min(targetVolume, audio.current.volume + volumeIncrease)
      audio.current.volume = vol
      // Have we reached target volume level yet?
      if (audio.current.volume < targetVolume) {
        // Keep up going until maxed out
        setTimeout(increaseVolume, tick)
      }
    }
    function startIncreasingVolume() {
      increaseVolume()
    }
    startIncreasingVolume()
    audio.current.play()
  }

  return (
    <Fragment>
      <motion.div
        sx={{ display: `flex`, alignItems: `center` }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {playing ? (
          <FiPauseCircle
            onClick={() => {
              audio.current.pause()
              console.log("pause")
              setPlaying(false)
            }}
            sx={{ strokeWidth: 1 }}
            size={48}
          />
        ) : (
          <FiPlayCircle
            onClick={() => {
              if (hasStartedPlaying) {
                audio.current.play()
              } else {
                fadeIn()
              }
              console.log("play")
              setPlaying(true)
              setHasStartedPlaying(true)
            }}
            sx={{ strokeWidth: 1 }}
            size={48}
          />
        )}
      </motion.div>
      <PlayAnimation playing={playing} />
    </Fragment>
  )
}

export default PlaySection
