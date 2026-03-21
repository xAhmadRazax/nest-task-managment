import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { TaskStatus } from '#/types/task.types'
import type { TasksType } from '#/types/task.types'
import { getRemainingDuration } from '#/ultis/date-fns'
import React from 'react'
import { TaskStatusTransition } from './TaskStatusTransition'

export const SubTaskContent = ({
  tasks,
  disableStatusUpdates = false,
}: {
  tasks: TasksType[]
  disableStatusUpdates?: boolean
}) => {
  return (
    <Accordion
      multiple
      className="mt-4 ml-3 pl-6 pr-2 border-l-2 border-primary/20 space-y-4"
    >
      {tasks.map((task) => (
        <AccordionItem
          key={task.id}
          value={task.id}
          className="pb-3 border-b border-primary/20"
        >
          <AccordionTrigger className="py-1 text-base font-medium">
            {task.title}
          </AccordionTrigger>

          <AccordionContent className="pt-2 space-y-2">
            <p className="text-sm text-gray-300/80">{task.description}</p>

            {(task.status === TaskStatus.OPEN ||
              task.status === TaskStatus.IN_PROGRESS) && (
              <p className="text-sm text-gray-300/70">
                {getRemainingDuration(task.dueDate)}
              </p>
            )}

            <TaskStatusTransition
              id={task.id}
              status={task.status}
              disabled={disableStatusUpdates}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
