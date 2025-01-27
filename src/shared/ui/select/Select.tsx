import * as RadixSelect from '@radix-ui/react-select'
import { ElementRef, forwardRef } from 'react'
import ArrowDownIcon from '../../assets/icons/arrow-down.svg?react'
import s from './Select.module.scss'

type Props = {
  options: SelectItemProps[]
  value: string
  onChange: (value: string) => void
}

export const Select = forwardRef<ElementRef<typeof RadixSelect.Trigger>, Props>(
  ({ options, value, onChange }, forwardedRef) => {
    return (
      <RadixSelect.Root value={value} onValueChange={onChange}>
        <RadixSelect.Trigger ref={forwardedRef} className={s.trigger}>
          <RadixSelect.Value />
          <RadixSelect.Icon asChild>
            <ArrowDownIcon className={s.icon} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
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
    )
  }
)

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
