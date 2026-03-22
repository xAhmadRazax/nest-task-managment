import { Button } from '#/components/Button'
import { Modal } from '#/components/Modal'
import { cn } from '#/lib/utils'
import type { TasksType } from '#/types/task.types'

import { TaskMutationForm } from './TaskMutationForm'

export const TaskMutationButton = ({ task }: { task?: TasksType }) => {
  return (
    <Modal>
      <Modal.Open opens="add-task-form">
        <Button
          type="button"
          className={cn(
            `w-auto rounded-4xl`,
            task && 'bg-primary/60 w-fit hover:bg-primary/50 rounded-2xl',
          )}
        >
          {task && task.id ? 'Update Task' : 'Add Task'}
        </Button>
      </Modal.Open>

      <Modal.Window name="add-task-form">
        <TaskMutationForm task={task} />
      </Modal.Window>
    </Modal>
  )
}
