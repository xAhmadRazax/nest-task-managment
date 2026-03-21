import { taskQueryOptions } from '#/queries/tasks.query'
import { Route } from '#/routes/_protected/tasks/$taskId'
import { useQuery } from '@tanstack/react-query'

export function useTask() {
  const { taskId } = Route.useParams()
  const {
    data,
    error,
    isPending: isLoading,
  } = useQuery(taskQueryOptions(taskId))
  return { data, error, isLoading }
}
