import s from './Avatar.module.scss'
import AvatarIcon from '../../assets/icons/avatar.svg?react'

type Props = {
  src: string
  name: string
  surname: string
}

function getInitials(name: string, surname: string) {
  return `${name[0].toUpperCase()}${surname[0].toUpperCase()}`
}

export const Avatar = ({ surname, name, src }: Props) => {
  if (src) {
    return (
      <div className={s.container}>
        <img src={src} alt="" className={s.img} />
      </div>
    )
  }

  if (name && surname) {
    return (
      <div className={s.container}>
        <span>{getInitials(name, surname)}</span>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <AvatarIcon />
    </div>
  )
}
