import { useTask } from '#/features/tasks/hooks/useTask'
import { TaskDetails } from '#/features/tasks/TaskDetails'

export const TaskDetailsPage = () => {
  const { data: task } = useTask()

  return (
    <>
      <TaskDetails {...task} />
    </>
  )
}
