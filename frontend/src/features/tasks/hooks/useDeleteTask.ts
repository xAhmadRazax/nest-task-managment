import { deleteTaskMutationOptions } from '#/queries/tasks.query'
import { QueryClient, useMutation } from '@tanstack/react-query'

export function useDeleteTask(id: string) {
  const queryClient = new QueryClient()
  const {
    mutate: deleteTaskStatusMutation,
    error,
    isPending: isLoading,
  } = useMutation({
    ...deleteTaskMutationOptions(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', id] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
  return { deleteTaskStatusMutation, error, isLoading }
}
