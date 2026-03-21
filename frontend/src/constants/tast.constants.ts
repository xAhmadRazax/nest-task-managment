import type { TaskStatus } from '#/types/task.types'

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  {
    label: string
    class: string
  }
> = {
  OPEN: {
    label: 'Open',
    class: 'bg-primary/15 text-primary border border-primary/30',
  },

  IN_PROGRESS: {
    label: 'In Progress',
    class: 'bg-primary/15 text-primary border border-primary/30',
  },

  DONE: {
    label: 'Done',
    class: 'bg-primary-/15 text-primary-foreground/80 border border-primary',
  },

  FAILED: {
    label: 'Failed',
    class: 'bg-red-500/15 text-red-400 border border-red-500/30',
  },

  ABANDONED: {
    label: 'Abandoned',
    class: 'bg-zinc-500/15 text-zinc-400 border border-zinc-500/30',
  },
}
