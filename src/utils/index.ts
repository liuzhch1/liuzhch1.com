import { TZDate } from '@date-fns/tz'
import { format, parseISO } from 'date-fns'

export const formatDate = ({
  year = false,
  date,
  time = true,
}: {
  year?: boolean
  date: Date | string
  time?: boolean
}): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  const tzDate = new TZDate(parsedDate, 'Asia/Shanghai')
  if (process.env.NODE_ENV !== 'development') {
    tzDate.setHours(tzDate.getHours() - 8)
  }
  return format(
    tzDate,
    (year ? 'yyyy/' : '') + (time ? 'MM/dd HH:mm' : 'MM/dd'),
  )
}
