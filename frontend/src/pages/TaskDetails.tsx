import { useTask } from '#/features/tasks/hooks/useTask'
import { TaskDetails } from '#/features/tasks/TaskDetails'

export const TaskDetailsPage = () => {
  const { data: task, isLoading } = useTask()

  // if (isLoading) return <div>Loading...</div>
  if (!task) return <div>Task not found</div>

  return (
    <>
      <TaskDetails {...task} />
    </>
  )
}
