import { tasksQueryOptions } from '#/queries/tasks.query'
import type { TaskSearchType } from '#/types/task.types'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useTasks(filter: TaskSearchType) {
  const {
    data,
    error,
    isPending: isLoading,
  } = useSuspenseQuery(tasksQueryOptions(filter))
  return { data, error, isLoading }
}
