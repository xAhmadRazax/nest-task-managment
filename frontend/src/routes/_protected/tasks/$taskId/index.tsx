import { TaskDetailsPage } from '#/pages/TaskDetails'
import { taskQueryOptions } from '#/queries/tasks.query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tasks/$taskId/')({
  component: RouteComponent,
  loader: ({ params: { taskId }, context: { queryClient } }) => {
    queryClient.ensureQueryData(taskQueryOptions(taskId))
  },
})

function RouteComponent() {
  return <TaskDetailsPage />
}
