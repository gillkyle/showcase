/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useRef, useEffect } from "react"
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi"
import { motion } from "framer-motion"

const PlayButton = ({ id }) => {
  const [playing, setPlaying] = useState(false)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)
  const audio = useRef(
    new Audio(
      `https://p.scdn.co/mp3-preview/b863a6988fb06fd3da47b6ffe80a364f8975a1b2?cid=774b29d4f13844c495f206cafdad9c86`
    )
  )

  useEffect(() => {
    audio.current.onended = () => {
      setPlaying(false)
    }
    audio.current.volume = 0
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
    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
      {playing ? (
        <FiPauseCircle
          onClick={() => {
            audio.current.pause()
            console.log("pause")
            setPlaying(false)
          }}
          sx={{ strokeWidth: 1 }}
          size={64}
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
          size={64}
        />
      )}
    </motion.div>
  )
}

export default PlayButton
