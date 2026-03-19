import { addTaskApi } from '#/lib/task.service'
import { mutationOptions } from '@tanstack/react-query'
import type { TaskInputs } from 'types/task.types'

export const addTaskMutationOption = mutationOptions({
  mutationKey: ['createTask'],
  mutationFn: ({ title, description, dueDate, subTasks }: TaskInputs) =>
    addTaskApi({ title, description, dueDate, subTasks }),
  onError: (err) => {},
  onSuccess: () => {},
})
