import {
  addTaskMutationOption,
  updateTaskMutationOption,
} from '#/queries/tasks.query'
import type { TaskSearchType } from '#/types/task.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useTaskMutation(filters: TaskSearchType, id?: string) {
  const addMutation = useMutation(addTaskMutationOption(filters))
  const updateMutation = useMutation(updateTaskMutationOption(id!))

  if (id) {
    return {
      taskMutationHandler: updateMutation.mutate,
      error: updateMutation.error,
      isLoading: updateMutation.isPending,
    }
  }

  return {
    taskMutationHandler: addMutation.mutate,
    error: addMutation.error,
    isLoading: addMutation.isPending,
  }
}
