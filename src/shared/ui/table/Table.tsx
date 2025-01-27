import s from './Table.module.scss'
import { clsx } from 'clsx'
import { ComponentPropsWithoutRef, FC, useState } from 'react'
import ArrowDownIcon from '../../assets/icons/arrow-down.svg?react'
import ArrowUpIcon from '../../assets/icons/arrow-up.svg?react'
import { CallType } from '../../../api'
import { CallType as Call } from '../callType'
import moment from 'moment/moment'
import { Avatar } from '../avatar'
import { Grade } from '../grade'
import { RecordPlayer } from '../audioPlayer'
import { convertSecondsToString } from '../../utils'

export type Sort = {
  key: string
  direction: 'ASC' | 'DESC'
} | null

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

const Root = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => {
  return <table className={clsx(s.root, className)} {...props} />
}

const Header = (props: ComponentPropsWithoutRef<'thead'>) => {
  return <thead {...props} />
}
const Body = (props: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody {...props} />
}

const Row = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => {
  return <tr className={clsx(s.row, className)} {...props} />
}

const HeadCell = ({ ...props }: ComponentPropsWithoutRef<'th'>) => {
  return <th className={clsx(s.headCell)} align={'left'} {...props} />
}

const Cell = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => {
  return <td className={clsx(s.cell, className)} {...props} />
}

const Head: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      sort?: Sort
      onSort?: (sort: Sort) => void
    },
    'children'
  >
> = ({ columns, sort, onSort, ...rest }) => {
  const handleSort = (key: string, sortable?: boolean) => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'ASC' })

    if (sort.direction === 'DESC') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'ASC' ? 'DESC' : 'ASC',
    })
  }

  return (
    <Header {...rest}>
      <Row>
        {columns.map((column, i) => (
          <HeadCell
            align={columns.length - 1 !== i ? 'left' : 'right'}
            key={column.key}
            onClick={() => handleSort(column.key, column.sortable)}
            data-sortable={column.sortable}
          >
            <div className={s.headCellContent}>
              {column.title}
              {sort?.key === column.key ? (
                <span className={s.icon}>
                  {sort?.key === column.key && sort.direction === 'ASC' ? (
                    <ArrowUpIcon width={18} height={21} />
                  ) : (
                    <ArrowDownIcon width={18} height={21} />
                  )}
                </span>
              ) : (
                <span></span>
              )}
            </div>
          </HeadCell>
        ))}
      </Row>
    </Header>
  )
}

const TableRow = ({
  unit: {
    grade,
    status,
    in_out,
    person_avatar,
    person_name,
    person_surname,
    date,
    source,
    time,
    from_number,
    to_number,
    record,
    partnership_id,
  },
}: {
  unit: CallType
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const mouseEnterHandler = () => {
    setIsHovered(true)
  }
  const mouseLeaveHandler = () => {
    setIsHovered(false)
  }

  return (
    <Row onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      <Cell className={s.type}>
        <Call status={status} inOut={in_out} />
      </Cell>
      <Cell className={s.time}>{moment(date).format('HH:mm')}</Cell>
      <Cell className={s.employee}>
        <Avatar
          src={person_avatar}
          name={person_name}
          surname={person_surname}
        />
      </Cell>
      <Cell className={s.call}>{in_out === 0 ? to_number : from_number}</Cell>
      <Cell className={s.source}>{source}</Cell>
      <Cell className={s.grade}>
        <Grade grade={grade} />
      </Cell>
      <Cell align={'right'} className={s.duration}>
        {time === 0 ? null : isHovered ? (
          <RecordPlayer recordId={record} partnershipId={partnership_id} />
        ) : (
          convertSecondsToString(time, 'sec')
        )}
      </Cell>
    </Row>
  )
}

export const Table = {
  Root,
  Head,
  Body,
  TableRow,
}
