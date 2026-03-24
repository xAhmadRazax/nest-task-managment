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

  if (days < 0) return 'Overdue'
  if (days === 0) return 'Due today'
  if (days === 1) return '1 day remaining'
  return `${days} days remaining`
}
