import * as RadixSlider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'
import PlayIcon from '../../assets/icons/play.svg?react'
import CloseIcon from '../../assets/icons/close.svg?react'
import StopIcon from '../../assets/icons/stop.svg?react'
import DownloadIcon from '../../assets/icons/download.svg?react'

import s from './AudioController.module.scss'
import useSound from 'use-sound'
import { convertSecondsToString } from '../../utils'

type PlayerProps = {
  src: string
}

export const AudioController = ({ src }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [play, { pause, duration, sound, stop }] = useSound(src, {
    onend: () => setIsPlaying(false),
  })
  const [totalDuration, setTotalDuration] = useState<string>('0:0')
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (duration) {
      setTotalDuration(convertSecondsToString(duration, 'ms'))
    }
  }, [duration])
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sound])

  const playingButton = () => {
    if (isPlaying) {
      pause()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }

  const interruptPlaying = () => {
    setIsPlaying(false)
    stop()
  }

  return (
    <>
      <div className={s.player}>
        <div className={s.audioLength}>{totalDuration}</div>
        <button onClick={playingButton} className={s.controlBtn}>
          {isPlaying ? <StopIcon /> : <PlayIcon />}
        </button>
        <Slider
          max={duration! / 1000}
          value={[seconds]}
          onValueChange={(value) => {
            sound.seek(value)
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
      </div>
    </>
  )
}

type SliderProps = {
  value?: number[]
  max: number
  onValueChange?(value: number[]): void
}

const Slider = (props: SliderProps) => {
  return (
    <RadixSlider.Root
      onValueChange={props.onValueChange}
      className={s.Root}
      value={props.value}
      max={props.max}
      step={1}
    >
      <RadixSlider.Track className={s.Track}>
        <RadixSlider.Range className={s.Range} />
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}
