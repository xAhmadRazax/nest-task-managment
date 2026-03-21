import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { TASK_STATUS_CONFIG } from '#/constants/tast.constants'
import { cn } from '#/lib/utils'
import { statusValidTransition } from '#/types/task.types'
import type { TaskStatus } from '#/types/task.types'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateTaskStatus } from './hooks/useUpdateTaskStatus'

export const TaskStatusTransition = ({
  id,
  status,
  disabled = false,
}: {
  id: string
  status: TaskStatus
  disabled?: boolean
}) => {
  const queryClient = useQueryClient()
  const { updateTaskStatusMutation, isLoading, error } = useUpdateTaskStatus(id)

  return (
    <Select
      disabled={disabled}
      onValueChange={(data) => {
        if (!data) {
          return
        }
        const formattedValue = (data as string)
          .toUpperCase()
          .split(' ')
          .join('_')
        updateTaskStatusMutation(
          {
            taskId: id,
            status: formattedValue as TaskStatus,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['task', id] })
              queryClient.invalidateQueries({ queryKey: ['tasks'] })
            },
          },
        )
      }}
    >
      <SelectTrigger className={cn(`w-45 h-50 border-primary/80`)}>
        <SelectValue
          className="text-primary-foreground/50 "
          placeholder={TASK_STATUS_CONFIG[status].label}
        />
      </SelectTrigger>
      <SelectContent
        className={'bg-primary-foreground/60 text-primary-foreground/80  '}
      >
        <SelectGroup className={''}>
          <SelectLabel className="text-primary font-semibold">
            Status
          </SelectLabel>
          {statusValidTransition[status].length > 0 &&
            statusValidTransition[status].map((taskStatus) => (
              <SelectItem
                className="px-2 py-2 cursor-pointer "
                value={TASK_STATUS_CONFIG[taskStatus].label}
              >
                {TASK_STATUS_CONFIG[taskStatus].label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
