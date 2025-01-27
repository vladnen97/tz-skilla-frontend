import s from './Grade.module.scss'
import { clsx } from 'clsx'

type Props = {
  grade: 'good' | 'excellent' | 'bad'
}

const gradeTranslate = {
  good: 'Хорошо',
  bad: 'Плохо',
  excellent: 'Отлично',
}

export const Grade = ({ grade }: Props) => {
  return (
    <div className={clsx(s.gradeBlock, s[grade])}>{gradeTranslate[grade]}</div>
  )
}
