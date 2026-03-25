import { TasksLoaderSuspense } from '#/features/tasks/TasksLoaderSuspense'
import { TaskPage } from '#/pages/Tasks'
import { tasksQueryOptions } from '#/queries/tasks.query'
import { tasksSearchSchema } from '#/types/task.types'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/tasks/')({
  component: RouteComponent,
  validateSearch: tasksSearchSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(tasksQueryOptions(deps.filters))
  },
})

function RouteComponent() {
  return (
    <Suspense fallback={<TasksLoaderSuspense />}>
      <TaskPage />
    </Suspense>
  )
}
