import { TZDate } from '@date-fns/tz'
import { format, parseISO } from 'date-fns'

export const formatDate = ({
  date,
  time = true,
}: {
  date: Date | string
  time?: boolean
}): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  const tzDate = new TZDate(parsedDate, 'Asia/Shanghai')
  if (process.env.NODE_ENV !== 'development') {
    tzDate.setHours(tzDate.getHours() - 8)
  }
  return format(tzDate, time ? 'yyyy/MM/dd HH:mm' : 'yyyy/MM/dd')
}
