import type { User } from '#/types/user.type'

interface TaskInputs {
  title: string
  description: string
  dueDate: Date | undefined
}

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
  createdAt: Date
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
