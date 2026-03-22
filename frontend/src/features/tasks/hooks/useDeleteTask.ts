import { deleteTaskMutationOptions } from '#/queries/tasks.query'
import { QueryClient, useMutation } from '@tanstack/react-query'

export function useDeleteTask(id: string) {
  const {
    mutate: deleteTaskStatusMutation,
    error,
    isPending: isLoading,
  } = useMutation({
    ...deleteTaskMutationOptions(id),
    onSuccess: () => {},
  })
  return { deleteTaskStatusMutation, error, isLoading }
}
