import IncomingIcon from '../../assets/icons/incoming.svg?react'
import OutgoingIcon from '../../assets/icons/outgoing.svg?react'
import MissedIcon from '../../assets/icons/missed.svg?react'
import MissedCallIcon from '../../assets/icons/missedCall.svg?react'

type Props = {
  inOut: 0 | 1
  status: 'Дозвонился' | 'Не дозвонился'
}

const calls = {
  incoming: <IncomingIcon />,
  outgoing: <OutgoingIcon />,
  missed: <MissedIcon />,
  missedCall: <MissedCallIcon />,
}

const getCallTypeFromParams = (
  inOut: 0 | 1,
  status: 'Дозвонился' | 'Не дозвонился'
) => {
  if (inOut === 1) {
    if (status === 'Дозвонился') {
      return 'incoming'
    } else {
      return 'missed'
    }
  } else {
    if (status === 'Дозвонился') {
      return 'outgoing'
    } else {
      return 'missedCall'
    }
  }
}

export const CallType = ({ status, inOut }: Props) => {
  return calls[getCallTypeFromParams(inOut, status)]
}
