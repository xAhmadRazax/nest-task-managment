import { TaskLoaderSuspense } from '#/features/tasks/TasksLoaderSuspense'
import { TaskDetailsPage } from '#/pages/TaskDetails'
import { taskQueryOptions } from '#/queries/tasks.query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/tasks/$taskId/')({
  component: RouteComponent,
  loader: async ({ params: { taskId }, context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(taskQueryOptions(taskId))
    } catch {
      throw redirect({ to: '/tasks', replace: true })
    }
  },
})

function RouteComponent() {
  return (
    <Suspense fallback={<TaskLoaderSuspense />}>
      <TaskDetailsPage />
    </Suspense>
  )
}
