import { useEffect, useMemo, useState } from 'react'
import { DateSelect, Select, Table } from './shared/ui'
import CloseIcon from './shared/assets/icons/close.svg?react'
import s from './App.module.scss'
import { api, CallType } from './api'
import { Column, Sort } from './shared/ui/table/Table'
import moment, { Moment } from 'moment'
import { groupDataByDay } from './shared/utils/groupDataByDay'

const headers: Column[] = [
  {
    key: 'type',
    title: 'Тип',
    sortable: false,
  },
  {
    key: 'date',
    title: 'Время',
    sortable: true,
  },
  {
    key: 'employee',
    title: 'Сотрудник',
    sortable: false,
  },
  {
    key: 'phoneNumber',
    title: 'Звонок',
    sortable: false,
  },
  {
    key: 'source',
    title: 'Источник',
    sortable: false,
  },
  {
    key: 'grade',
    title: 'Оценка',
    sortable: false,
  },
  {
    key: 'duration',
    title: 'Длительность',
    sortable: true,
  },
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
  const [isFiltered, setIsFiltered] = useState<boolean>(false)
  const [data, setData] = useState<Map<string, CallType[]>>(new Map())
  const [callTypeValue, setCallTypeValue] = useState(selectOptions[0].value)
  const [dateValue, setDateValue] = useState(dateSelectOptions[0].value)
  const [orderBy, setOrderBy] = useState<Sort>(null)

  const sortOrderString = useMemo(() => {
    if (!orderBy) return null

    return `sort_by=${orderBy.key}&order=${orderBy.direction}`
  }, [orderBy])
  const inOutSortString = useMemo(() => {
    if (callTypeValue === 'incoming') return 'in_out=1'
    if (callTypeValue === 'outgoing') return 'in_out=0'

    return null
  }, [callTypeValue])
  const getDateRangeString = useMemo(() => {
    const today = moment()
    let fromDate: string, toDate: string

    const formatDate = (date: Moment) => {
      return date.format('YYYY-MM-DD')
    }

    switch (dateValue) {
      case 'week':
        fromDate = formatDate(moment().subtract(7, 'days'))
        toDate = formatDate(today)
        break
      case 'month':
        fromDate = formatDate(moment().subtract(30, 'days'))
        toDate = formatDate(today)
        break
      default:
        fromDate = formatDate(moment().subtract(3, 'days'))
        toDate = formatDate(today)
    }

    return `date_start=${fromDate}&date_end=${toDate}`
  }, [dateValue])
  const clearFilters = () => {
    setCallTypeValue(selectOptions[0].value)
    setDateValue(dateSelectOptions[0].value)
    setIsFiltered(false)
  }

  useEffect(() => {
    api
      .getList(sortOrderString, inOutSortString, getDateRangeString)
      .then((data) => {
        setData(groupDataByDay(data))
      })
  }, [sortOrderString, inOutSortString, getDateRangeString])
  useEffect(() => {
    if (
      callTypeValue !== selectOptions[0].value ||
      dateValue !== dateSelectOptions[0].value
    ) {
      setIsFiltered(true)
    } else {
      setIsFiltered(false)
    }
  }, [callTypeValue, dateValue])

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <Select
          options={selectOptions}
          value={callTypeValue}
          onChange={setCallTypeValue}
        />
        {isFiltered && (
          <button className={s.clearFiltersBtn} onClick={clearFilters}>
            Сбросить фильтры
            <CloseIcon width={15} height={15} />
          </button>
        )}
        <DateSelect
          className={s.dateSelect}
          options={dateSelectOptions}
          value={dateValue}
          onChange={setDateValue}
        />
      </div>
      <div className={s.tables}>
        {data.size > 0 && (
          <Table.Root>
            <Table.Head columns={headers} sort={orderBy} onSort={setOrderBy} />
            <Table.Body>
              {data
                .values()
                .next()
                .value?.map((callUnit, i) => (
                  <Table.TableRow unit={callUnit} key={i} />
                ))}
            </Table.Body>
          </Table.Root>
        )}

        {Array.from(data.keys())
          .slice(1)
          .map((date) => (
            <>
              <div className={s.date}>
                {date} <span className={s.badge}>{data.get(date)?.length}</span>
              </div>
              <Table.Root>
                <Table.Body>
                  {data
                    .get(date)
                    ?.map((callUnit, i) => (
                      <Table.TableRow unit={callUnit} key={i} />
                    ))}
                </Table.Body>
              </Table.Root>
            </>
          ))}
      </div>
    </div>
  )
}

export default App
