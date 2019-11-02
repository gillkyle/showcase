import { useEffect, useRef } from "react"

export function useAudio(url) {
  const audio = useRef()

  useEffect(() => {
    audio.current = new Audio(url)
  }, [])

  return audio
}
