import { CallType, ResponseType } from './types'
import { getRandomFeedback } from '../shared/utils'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const api = {
  getList: async (
    sort: string | null,
    inOut: string | null,
    dateDiapason: string
  ): Promise<CallType[]> => {
    const response = await fetch(
      `${BASE_URL}/getList?${dateDiapason}&${sort}&${inOut}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = (await response.json()) as ResponseType

    return data.results.map((el) => ({
      ...el,
      grade: getRandomFeedback(),
    }))
  },
  getRecord: async (
    recordId: string,
    partnershipId: string
  ): Promise<string> => {
    const response = await fetch(
      `${BASE_URL}/getRecord?record=${recordId}&partnershipId=${partnershipId}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type':
            'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Disposition': 'filename="record.mp3"',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  },
}
