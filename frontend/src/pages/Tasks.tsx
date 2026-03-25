import { Container } from '#/components/Container'
import { InputField } from '#/components/InputField'
import { Button } from '#/components/ui/Button'
import { useTasks } from '#/features/tasks/hooks/useTasks'
import { Pagination } from '#/features/tasks/Pagination'
import { Task } from '#/features/tasks/Task'
import { TaskMutationButton } from '#/features/tasks/TaskMutationButton'
import { Route } from '#/routes/_protected/tasks'
import type { TaskSearchType } from '#/types/task.types'
import { useNavigate } from '@tanstack/react-router'

export const TaskPage = () => {
  const navigation = useNavigate()
  const filters = Route.useSearch()
  const { data, isLoading } = useTasks(filters)
  const tasks = data.data

  console.log(data.meta)
  return (
    <section className="min-h-[calc(100svh-59px)]  flex h-[calc(100svh-59px)] overflow-auto ">
      <Container className="flex flex-col ">
        <header className=" text-primary-foreground flex justify-between mt-4 ">
          <h2 className="text-2xl">Tasks</h2>
          <div className="flex justify-center">
            <TaskMutationButton />
          </div>
        </header>

        <div className=" mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {/* <Tasks /> <Tasks /> <Tasks /> <Tasks /> */}

          {tasks.length > 0 &&
            tasks.map((task) => <Task task={task} key={task.id} />)}
        </div>

        {data.meta.totalPages > 1 && (
          <Pagination
            navigation={navigation}
            filters={filters}
            totalPages={data.meta.totalPages}
          />
        )}
      </Container>
    </section>
  )
}
