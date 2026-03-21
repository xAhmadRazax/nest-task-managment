import { updateTaskStatusMutationOptions } from '#/queries/tasks.query'
import type { TasksType } from '#/types/task.types'
import { QueryClient, useMutation } from '@tanstack/react-query'

export function useUpdateTaskStatus(id: string) {
  const queryClient = new QueryClient()
  const {
    mutate: updateTaskStatusMutation,
    error,
    isPending: isLoading,
  } = useMutation({
    ...updateTaskStatusMutationOptions(id),
    onSuccess: (data: TasksType) => {
      console.log(data, 'update status data')
      queryClient.invalidateQueries({ queryKey: ['task', data.id] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
  return { updateTaskStatusMutation, error, isLoading }
}
