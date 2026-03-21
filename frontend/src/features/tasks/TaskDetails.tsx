import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'
import { TaskStatus } from '#/types/task.types'
import type { TasksType } from '#/types/task.types'
import { getRemainingDuration } from '#/ultis/date-fns'
import { Link } from '@tanstack/react-router'
import { SubTaskContent } from './SubTaskContent'
import { TaskStatusTransition } from './TaskStatusTransition'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/Button'
import { DeleteTask } from './DeleteTask'
import { DeleteTaskButton } from './DeleteTaskButton'

export const TaskDetails = ({
  id,
  title,
  description,
  status,
  dueDate,
  subTasks,
}: TasksType) => {
  return (
    <Container className="pt-8 max-w-[min(95%,560px)] h-[calc(100svh-56px)] grid items-center">
      <CardWrapper className="py-8">
        <article className="space-y-5">
          {/* Header */}
          <header className="space-y-4 ">
            <div className="flex justify-between">
              <Link to=".." title="go-back">
                <ArrowLeft className="text-primary-foreground/60" />
              </Link>

              <TaskStatusTransition id={id} status={status} />
            </div>
            <h2 className="text-xl font-semibold leading-tight pt-2">
              {title}
            </h2>
          </header>

          {/* Description */}
          <p className="text-base leading-relaxed">{description}</p>

          {/* Remaining days */}
          {(status === TaskStatus.OPEN ||
            status === TaskStatus.IN_PROGRESS) && (
            <p className="text-sm text-gray-300/80">
              {getRemainingDuration(dueDate)}
            </p>
          )}

          {/* Subtasks */}
          {subTasks && subTasks.length > 0 && (
            <>
              <div className="pt-2">
                <SubTaskContent
                  tasks={subTasks}
                  disableStatusUpdates={
                    status === TaskStatus.DONE ||
                    status === TaskStatus.ABANDONED ||
                    status === TaskStatus.FAILED
                      ? true
                      : false
                  }
                />
              </div>
            </>
          )}

          {/* Button Containers */}

          <div className="mt-8 flex justify-between">
            <DeleteTaskButton id={id} />
            <Button
              type="button"
              className="bg-primary/60 w-fit hover:bg-primary/50"
            >
              Edit
            </Button>
          </div>
        </article>
      </CardWrapper>
    </Container>
  )
}
