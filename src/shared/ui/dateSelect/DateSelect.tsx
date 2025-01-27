import s from './DateSelect.module.scss'
import ArrowLeftIcon from '../../assets/icons/arrow_left.svg?react'
import ArrowRightIcon from '../../assets/icons/arrow_right.svg?react'
import CalendarIcon from '../../assets/icons/icon-calendar.svg?react'
import { Select } from '../select'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

type Props = ComponentProps<typeof Select> & {
  className?: string
}

export const DateSelect = forwardRef<
  ElementRef<typeof RadixSelect.Trigger>,
  Props
>(({ options, value, onChange, className }, forwardedRef) => {
  const onArrowLeftClick = () => {
    const prevItemId = options.findIndex((option) => option.value === value) - 1

    if (prevItemId >= 0 && !options[prevItemId].disabled) {
      onChange(options[prevItemId].value)
    }
  }
  const onArrowRightClick = () => {
    const nextItemId = options.findIndex((option) => option.value === value) + 1

    if (nextItemId < options.length && !options[nextItemId].disabled) {
      onChange(options[nextItemId].value)
    }
  }

  const onItemChange = (value: string) => {
    onChange(value)
  }

  return (
    <div className={clsx(s.dateSelect, className)}>
      <button className={s.arrow} onClick={onArrowLeftClick}>
        <ArrowLeftIcon />
      </button>
      <RadixSelect.Root value={value} onValueChange={onItemChange}>
        <RadixSelect.Trigger ref={forwardedRef} className={s.trigger}>
          <RadixSelect.Icon asChild>
            <CalendarIcon />
          </RadixSelect.Icon>
          <RadixSelect.Value />
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            align={'center'}
            position={'popper'}
            className={s.content}
            sideOffset={12}
          >
            <RadixSelect.Viewport>
              {options.map((item) => (
                <SelectItem
                  value={item.value}
                  disabled={item.disabled}
                  label={item.label}
                  key={item.value}
                />
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      <button className={s.arrow} onClick={onArrowRightClick}>
        <ArrowRightIcon />
      </button>
    </div>
  )
})

type SelectItemProps = {
  label: string
  value: string
  disabled?: boolean
}

const SelectItem = forwardRef<
  ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(({ label, value, disabled }, forwardedRef) => {
  return (
    <RadixSelect.Item
      disabled={disabled}
      value={value}
      ref={forwardedRef}
      className={s.item}
    >
      <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
    </RadixSelect.Item>
  )
})
