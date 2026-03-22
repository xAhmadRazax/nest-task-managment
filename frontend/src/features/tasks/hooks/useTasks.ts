import { tasksQueryOptions } from '#/queries/tasks.query'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useTasks() {
  const {
    data,
    error,
    isPending: isLoading,
  } = useSuspenseQuery(tasksQueryOptions)
  return { data, error, isLoading }
}
