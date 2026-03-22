import {
  addTaskApi,
  updateTaskApi,
  getTaskApi,
  getTasksApi,
  updateTaskStatusApi,
  deleteTaskApi,
} from '#/lib/task.service'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import type { CreateTaskDto, TaskStatus, TasksType } from '#/types/task.types'

export const addTaskMutationOption = mutationOptions({
  mutationKey: ['tasks'],
  mutationFn: ({ title, description, dueDate, subTasks }: CreateTaskDto) =>
    addTaskApi({ title, description, dueDate, subTasks }),
  onError: (err) => {},
  onSuccess: () => {},
})

export const updateTaskMutationOption = (id: string) =>
  mutationOptions({
    mutationKey: ['task', id],
    mutationFn: ({ title, description, dueDate, subTasks }: CreateTaskDto) =>
      updateTaskApi(id, { title, description, dueDate, subTasks }),
    onError: (err) => {},
    onSuccess: () => {},
  })

export const tasksQueryOptions = queryOptions({
  queryKey: ['tasks'],
  queryFn: getTasksApi,
})

export const taskQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['task', id],
    queryFn: () => getTaskApi(id),
  })

export const updateTaskStatusMutationOptions = (id: string) =>
  mutationOptions({
    mutationKey: ['task', id],
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string
      status: TaskStatus
    }): Promise<TasksType> => updateTaskStatusApi({ id: taskId, status }),
    onError: (err) => {},
    onSuccess: () => {},
  })

export const deleteTaskMutationOptions = (id: string) =>
  mutationOptions({
    mutationKey: ['task', id],
    mutationFn: ({ taskId }: { taskId: string }): Promise<void> =>
      deleteTaskApi({ id: taskId }),
    onError: (err) => {},
    onSuccess: () => {},
  })
