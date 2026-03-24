import { CardWrapper } from '#/components/CardWrapper'
import { TaskStatus } from '#/types/task.types'
import type { TasksType } from '#/types/task.types'
import { getRemainingDuration } from '#/ultis/date-fns'
import { Link } from '@tanstack/react-router'
import { TaskStatusTransition } from './TaskStatusTransition'

interface TypeProps {
  task: TasksType
}

export const Task = ({
  task: { description, id, title, status, dueDate, subTasks },
}: TypeProps) => {
  return (
    <CardWrapper className={'px-5 py-5'}>
      <Link
        to="/tasks/$taskId"
        params={{ taskId: id }}
        className="flex flex-col space-y-4 h-full"
      >
        {/* Header */}
        <div className="flex flex-col space-y-3">
          <div className="ml-auto w-fit ">
            <TaskStatusTransition disabled={true} id={id} status={status} />
          </div>

          <h3 className="text-xl font-semibold leading-tight">{title}</h3>

          <p className="text-sm text-gray-300/80 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer / meta info */}
        <div className="mt-auto pt-2 space-y-2 text-sm text-primary-foreground/60">
          {subTasks && subTasks.length > 0 && <p>{subTasks.length} subtasks</p>}

          {(status === TaskStatus.OPEN ||
            status === TaskStatus.IN_PROGRESS) && (
            <p>{getRemainingDuration(dueDate)}</p>
          )}
        </div>
      </Link>
    </CardWrapper>
  )
}
