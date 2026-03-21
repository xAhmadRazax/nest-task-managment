import { tasksQueryOptions } from '#/queries/tasks.query'
import { useQuery } from '@tanstack/react-query'

export function useTasks() {
  const { data, error, isPending: isLoading } = useQuery(tasksQueryOptions)
  return { data, error, isLoading }
}
