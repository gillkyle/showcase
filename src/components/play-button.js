/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect, Fragment } from "react"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { motion } from "framer-motion"

import PlayAnimation from "../components/play-animation"
import { useAudio } from "../hooks/useAudio"

const PlaySection = ({ numBars, songPreview }) => {
  const [playing, setPlaying] = useState(false)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)
  const audio = useAudio(songPreview)

  useEffect(() => {
    audio.current.onended = () => {
      setPlaying(false)
    }
    audio.current.volume = 0
    // clean up function will pause the audio when navigating to a new page
    return function cleanup() {
      audio.current.pause()
    }
  }, [audio])

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
      <motion.button
        sx={{
          display: `flex`,
          alignItems: `center`,
          maragin: 0,
          border: 0,
          background: `transparent`,
          color: `white`,
          outline: 0,
          "&:active, &:focus": {
            color: `secondaryMuted`,
          },
        }}
        onKeyDown={e => {
          if (e.keyCode !== 32) {
            return
          }
          if (playing) {
            e.preventDefault()
            audio.current.pause()
            setPlaying(false)
          } else {
            e.preventDefault()

            if (hasStartedPlaying) {
              audio.current.play()
            } else {
              fadeIn()
            }
            setPlaying(true)
            setHasStartedPlaying(true)
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {playing ? (
          <FiPauseCircle
            onClick={() => {
              audio.current.pause()
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
              setPlaying(true)
              setHasStartedPlaying(true)
            }}
            sx={{ strokeWidth: 1 }}
            size={48}
          />
        )}
      </motion.button>
      <PlayAnimation numBars={numBars} playing={playing} />
    </Fragment>
  )
}

export default PlaySection
