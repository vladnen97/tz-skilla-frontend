import { useEffect, useState } from 'react'
import { api } from '../../../api'
import { AudioController } from '../audioController'

export const RecordPlayer = ({
  partnershipId,
  recordId,
}: {
  recordId: string
  partnershipId: string
}) => {
  const [audioUrl, setAudioUrl] = useState<string>('')

  useEffect(() => {
    if (recordId !== '' && partnershipId !== '') {
      api.getRecord(recordId, partnershipId).then((src) => {
        setAudioUrl(src)
      })
    }
  }, [recordId, partnershipId])

  return <AudioController src={audioUrl} />
}
