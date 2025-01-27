import * as RadixSlider from '@radix-ui/react-slider'
import s from './Slider.module.scss'

type SliderProps = {
  value?: number[]
  max: number
  onValueChange?(value: number[]): void
}

export const Slider = (props: SliderProps) => {
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
