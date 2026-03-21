import {
  differenceInCalendarMonths,
  differenceInDays,
  differenceInHours,
} from 'date-fns'

export function getRemainingDuration(dueDate: Date) {
  const now = new Date()
  const due = new Date(dueDate)

  const days = differenceInDays(due, now)
  const hours = differenceInHours(due, now)
  const months = differenceInCalendarMonths(due, now)

  if (hours < 24) return `${hours} hours remaining`
  if (months === 1) return `${months} month remaining`
  if (months > 1) return `${months} months remaining`
  if (days === 1) return `${days} day remaining`
  return `${days} days remaining`
}
