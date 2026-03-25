import type { User } from '#/types/user.type'
import z from 'zod'

// interface TaskInputs {
//   title: string
//   description: string
//   dueDate: Date | undefined
// }

const TaskInputsSchema = z.object({
  title: z.string().min(3, 'title must be at least 3 characters long'),
  description: z.string().optional(),
  dueDate: z.date().optional(),
})

export type TaskInputs = z.infer<typeof TaskInputsSchema>

export interface CreateTaskDto extends TaskInputs {
  subTasks?: TaskInputs[]
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  FAILED = 'FAILED', // this means that the task has not been completed in the given duration
  ABANDONED = 'ABANDONED', // means user just quit
}

export interface BasicTaskType {
  id: string
  title: string
  description: string
  dueDate: Date
  createdAt?: Date
  status: TaskStatus
}

export interface TasksType extends BasicTaskType {
  parent?: User
  subTasks?: BasicTaskType[]
}
export const statusValidTransition: Record<TaskStatus, TaskStatus[]> = {
  [TaskStatus.OPEN]: [TaskStatus.IN_PROGRESS, TaskStatus.ABANDONED],
  [TaskStatus.IN_PROGRESS]: [
    TaskStatus.DONE,
    TaskStatus.FAILED,
    TaskStatus.ABANDONED,
  ],
  [TaskStatus.DONE]: [],
  [TaskStatus.FAILED]: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS],
  [TaskStatus.ABANDONED]: [TaskStatus.OPEN],
}

export const tasksSearchSchema = z.object({
  page: z.coerce.number().int().min(1).optional().catch(1), // catch gives default so always present
  limit: z.coerce.number().int().min(1).max(100).optional().catch(2),
  search: z.string().optional().catch(undefined),
  status: z.enum(TaskStatus).optional().catch(undefined),
  sortBy: z.string().optional().catch('createdAt'),
  order: z.enum(['ASC', 'DESC']).optional().catch('DESC'),
})

export type TaskSearchType = z.infer<typeof tasksSearchSchema>
