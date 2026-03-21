import { TaskPage } from '#/pages/Tasks'
import { tasksQueryOptions } from '#/queries/tasks.query'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tasks/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(tasksQueryOptions)
  },
})

function RouteComponent() {
  return <TaskPage />
}
