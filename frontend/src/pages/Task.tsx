import { Button } from '#/components/Button'
import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'
import { AddTask } from '#/features/tasks/AddTask'

export const Task = () => {
  return (
    <section className="">
      <Container>
        <header className="text-primary-foreground flex justify-between mt-4 px-8">
          <h2 className="text-2xl">Tasks</h2>
          <AddTask />
        </header>

        <div>Task List</div>
      </Container>
    </section>
  )
}
