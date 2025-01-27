import { useEffect, useRef, useState } from 'react'
import PlayIcon from '../../assets/icons/play.svg?react'
import CloseIcon from '../../assets/icons/close.svg?react'
import StopIcon from '../../assets/icons/stop.svg?react'
import DownloadIcon from '../../assets/icons/download.svg?react'

import s from './AudioController.module.scss'
import { convertSecondsToString } from '../../utils'
import { Slider } from '../slider'

type PlayerProps = {
  src: string
}

export const AudioController = ({ src }: PlayerProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [seconds, setSeconds] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let interval: number
    const controller = new AbortController()

    if (audioRef.current) {
      audioRef.current.addEventListener(
        'loadedmetadata',
        () => {
          setIsLoaded(true)
          setDuration(audioRef.current!.duration)
        },
        {
          signal: controller.signal,
        }
      )

      audioRef.current.addEventListener(
        'ended',
        () => {
          setIsPlaying(false)
        },
        {
          signal: controller.signal,
        }
      )

      interval = setInterval(() => {
        setSeconds(audioRef.current!.currentTime)
      }, 500)
    }

    return () => {
      clearInterval(interval)
      controller.abort()
    }
  }, [])

  const playingButton = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      void audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  const interruptPlaying = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className={s.player} data-disabled={!isLoaded}>
      <div className={s.audioLength}>
        {convertSecondsToString(duration, 'sec')}
      </div>
      <button
        onClick={playingButton}
        className={s.controlBtn}
        disabled={!isLoaded}
      >
        {isPlaying ? <StopIcon /> : <PlayIcon />}
      </button>
      <Slider
        max={audioRef.current?.duration || 0}
        value={[seconds]}
        onValueChange={(value) => {
          audioRef.current!.currentTime = value[0]
        }}
      />
      <a href={src} download className={s.controlBtn}>
        <DownloadIcon />
      </a>
      {seconds !== 0 && (
        <button className={s.controlBtn} onClick={interruptPlaying}>
          <CloseIcon />
        </button>
      )}
      <audio src={src} ref={audioRef}></audio>
    </div>
  )
}
