import {
  addTaskMutationOption,
  updateTaskMutationOption,
} from '#/queries/tasks.query'
import { useMutation } from '@tanstack/react-query'

export function useTaskMutation(id?: string) {
  const {
    mutate: taskMutationHandler,
    error,
    isPending: isLoading,
  } = useMutation(id ? updateTaskMutationOption(id) : addTaskMutationOption)
  return { taskMutationHandler, error, isLoading }
}
