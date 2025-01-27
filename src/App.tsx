import { useEffect, useMemo, useState } from 'react'
import {
  Avatar,
  AudioController,
  Table,
  Select,
  CallType as Call,
  Grade,
} from './shared/ui'
import ambient from './shared/assets/audio/ambient.mp3'
import s from './App.module.scss'
import { api, CallType } from './api'
import { getRandomFeedback, convertSecondsToString } from './shared/utils'
import { DateSelect } from './shared/ui/dateSelect'

const headers = [
  'Тип',
  'Время',
  'Сотрудник',
  'Звонок',
  'Источник',
  'Оценка',
  'Длительность',
]

const selectOptions = [
  { value: 'all', label: 'Все типы', disabled: false },
  { value: 'incoming', label: 'Входящие', disabled: false },
  { value: 'outgoing', label: 'Исходящие', disabled: false },
]

const dateSelectOptions = [
  { value: '3days', label: '3 Дня', disabled: false },
  { value: 'week', label: 'Неделя', disabled: false },
  { value: 'month', label: 'Месяц', disabled: false },
  { value: 'year', label: 'Год', disabled: true },
]

function App() {
  const [data, setData] = useState<CallType[]>([])
  const [callTypeValue, setCallTypeValue] = useState(selectOptions[0].value)
  const [dateValue, setDateValue] = useState(dateSelectOptions[0].value)

  useEffect(() => {
    api.getList().then((data) => {
      console.log(data)
      setData(data.results)
    })
  }, [])

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <Select
          options={selectOptions}
          value={callTypeValue}
          onChange={setCallTypeValue}
        />
        <DateSelect
          options={dateSelectOptions}
          value={dateValue}
          onChange={setDateValue}
        />
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {headers.map((header, index, array) =>
              array.length - 1 === index ? (
                <Table.HeadCell key={index} align={'right'}>
                  {header}
                </Table.HeadCell>
              ) : (
                <Table.HeadCell key={index}>{header}</Table.HeadCell>
              )
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((callUnit, i) => (
            <TableRow unit={callUnit} key={i} />
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

const TableRow = ({
  unit: {
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
  },
}: {
  unit: CallType
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const grade = useMemo(getRandomFeedback, [])

  const mouseEnterHandler = () => {
    setIsHovered(true)
  }
  const mouseLeaveHandler = () => {
    setIsHovered(false)
  }

  return (
    <Table.Row
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Table.Cell className={s.type}>
        <Call status={status} inOut={in_out} />
      </Table.Cell>
      <Table.Cell className={s.time}>{date}</Table.Cell>
      <Table.Cell className={s.employee}>
        <Avatar
          src={person_avatar}
          name={person_name}
          surname={person_surname}
        />
      </Table.Cell>
      <Table.Cell className={s.call}>
        {in_out === 0 ? to_number : from_number}
      </Table.Cell>
      <Table.Cell className={s.source}>{source}</Table.Cell>
      <Table.Cell className={s.grade}>
        <Grade grade={grade} />
      </Table.Cell>
      <Table.Cell align={'right'} className={s.duration}>
        {isHovered ? (
          <AudioController src={ambient} />
        ) : (
          convertSecondsToString(time, 'sec')
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default App
