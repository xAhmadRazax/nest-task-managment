import { TaskLoaderSuspense } from '#/features/tasks/TasksLoaderSuspense'
import { TaskDetailsPage } from '#/pages/TaskDetails'
import { taskQueryOptions } from '#/queries/tasks.query'
import { tasksSearchSchema } from '#/types/task.types'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/tasks/$taskId/')({
  component: RouteComponent,
  validateSearch: tasksSearchSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: async ({ params: { taskId }, context: { queryClient }, deps }) => {
    try {
      await queryClient.ensureQueryData(taskQueryOptions(taskId))
    } catch {
      throw redirect({ to: '/tasks', replace: true, search: deps.filters })
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
