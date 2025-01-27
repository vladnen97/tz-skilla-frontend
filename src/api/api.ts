import { ResponseType } from './types'

const BASE_URL = 'https://api.skilla.ru/mango'
const API_KEY = 'testtoken'

export const api = {
  getList: async (): Promise<ResponseType> => {
    const response = await fetch(`${BASE_URL}/getList`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
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
