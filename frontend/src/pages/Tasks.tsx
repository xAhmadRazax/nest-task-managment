import { Button } from '#/components/Button'
import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'
import { AddTask } from '#/features/tasks/AddTask'
import { useTasks } from '#/features/tasks/hooks/useTasks'
import { Task } from '#/features/tasks/Task'

export const TaskPage = () => {
  const { data: tasks } = useTasks()
  return (
    <section className="">
      <Container>
        <header className=" text-primary-foreground flex justify-between mt-4 ">
          <h2 className="text-2xl">Tasks</h2>
          <AddTask />
        </header>

        <div className=" mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {/* <Tasks /> <Tasks /> <Tasks /> <Tasks /> */}
          {tasks && tasks.map((task) => <Task task={task} key={task.id} />)}
        </div>
      </Container>
    </section>
  )
}
