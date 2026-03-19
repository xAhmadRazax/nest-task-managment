import { addTaskMutationOption } from '#/queries/tasks.query'
import { useMutation } from '@tanstack/react-query'

export function useAddTask() {
  const {
    mutate: addTaskHandler,
    error,
    isPending: isLoading,
  } = useMutation(addTaskMutationOption)
  return { addTaskHandler, error, isLoading }
}
