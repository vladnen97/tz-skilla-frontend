// Функция для группировки данных по дням
import { CallType } from '../../api'

export function groupDataByDay(data: CallType[]): Map<string, CallType[]> {
  const groupedData = new Map<string, CallType[]>()

  data.forEach((item) => {
    const dateNoTime = item.date_notime

    if (!groupedData.has(dateNoTime)) {
      groupedData.set(dateNoTime, [])
    }
    groupedData.get(dateNoTime)?.push(item)
  })

  return groupedData
}
