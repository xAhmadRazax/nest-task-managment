import {
  addTaskApi,
  getTaskApi,
  getTasksApi,
  updateTaskStatusApi,
} from '#/lib/task.service'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import type { CreateTaskDto, TaskStatus, TasksType } from '#/types/task.types'

export const addTaskMutationOption = mutationOptions({
  mutationKey: ['createTask'],
  mutationFn: ({ title, description, dueDate, subTasks }: CreateTaskDto) =>
    addTaskApi({ title, description, dueDate, subTasks }),
  onError: (err) => {},
  onSuccess: () => {},
})

export const tasksQueryOptions = queryOptions({
  queryKey: ['tasks'],
  queryFn: getTasksApi,
  retry: false, // Don't retry 401s — user is just not logged in
  staleTime: Infinity, // Session doesn't go stale; invalidate manually on logout
})

export const taskQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['tasks', id],
    queryFn: () => getTaskApi(id),
    retry: false, // Don't retry 401s — user is just not logged in
    staleTime: Infinity, // Session doesn't go stale; invalidate manually on logout
  })

export const updateTaskStatusMutationOptions = (id: string) =>
  mutationOptions({
    mutationKey: ['tasks', id],
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
