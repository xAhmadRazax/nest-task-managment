import type { TaskStatus } from '#/types/task.types'

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  {
    label: string
    class: string
    dot: string
    border: string
  }
> = {
  OPEN: {
    label: 'Open',
    class: 'bg-slate-500/20   text-slate-400',
    dot: 'bg-slate-400',
    border: 'border-l-slate-500',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    class: 'bg-blue-500/20    text-blue-400',
    dot: 'bg-blue-400',
    border: 'border-l-blue-500',
  },
  DONE: {
    label: 'Done',
    class: 'bg-emerald-500/20 text-emerald-400',
    dot: 'bg-emerald-400',
    border: 'border-l-emerald-500',
  },
  FAILED: {
    label: 'Failed',
    class: 'bg-red-500/20     text-red-400',
    dot: 'bg-red-400',
    border: 'border-l-red-500',
  },
  ABANDONED: {
    label: 'Abandoned',
    class: 'bg-zinc-500/20    text-zinc-400',
    dot: 'bg-zinc-400',
    border: 'border-l-zinc-500',
  },
}
