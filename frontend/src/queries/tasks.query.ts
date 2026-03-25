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
import type {
  BasicTaskType,
  CreateTaskDto,
  TasksType,
  TaskSearchType,
} from '#/types/task.types'
import { TaskStatus } from '#/types/task.types'

export const addTaskMutationOption = (filters: TaskSearchType) =>
  mutationOptions({
    mutationKey: ['tasks'],
    mutationFn: ({ title, description, dueDate, subTasks }: CreateTaskDto) =>
      addTaskApi({ title, description, dueDate, subTasks }),
  })

export const updateTaskMutationOption = (id: string) =>
  mutationOptions({
    mutationKey: ['task', id],
    mutationFn: ({ title, description, dueDate, subTasks }: CreateTaskDto) =>
      updateTaskApi(id, { title, description, dueDate, subTasks }),
    onMutate: async (todo, context): Promise<{ previousTodos: TasksType }> => {
      const tempId = `temp-${Date.now()}-${Math.random()}`
      const tempTodo = Object.assign({}, todo)
      console.log(todo, 'todo')

      if (tempTodo.subTasks && tempTodo.subTasks.length > 0) {
        tempTodo.subTasks = (tempTodo.subTasks as BasicTaskType[]).map(
          (task) => {
            if (!task.id) {
              return { ...task, id: tempId, status: TaskStatus.OPEN }
            }

            return task
          },
        )
      }

      await context.client.cancelQueries({ queryKey: ['task', id] })

      // Snapshot the previous value
      const previousTodos = context.client.getQueryData(['task', id])
      context.client.setQueryData(['tasks'], () => {
        return tempTodo
      })

      return { previousTodos: previousTodos as TasksType }
    },
  })

export const tasksQueryOptions = (filters: TaskSearchType) =>
  queryOptions({
    queryKey: ['tasks', filters],
    queryFn: () => getTasksApi(filters),
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
