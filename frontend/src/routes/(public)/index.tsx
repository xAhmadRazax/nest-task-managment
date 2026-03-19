import { createFileRoute } from '@tanstack/react-router'
import { Container } from '#/components/Container'
import { CardWrapper } from '#/components/CardWrapper'
import { Button } from '#/components/Button'

export const Route = createFileRoute('/(public)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="">
      <Container>
        <section className="h-[calc(100svh-56px)] flex items-center justify-center  relative bg-primary/10">
          <div className="absolute bg-[url(hero-background.jpg)] opacity-40 bg-cover   bg-bottom h-full w-full"></div>
          <CardWrapper className="max-w-[95%] text-center relative z-10 ">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Take control of your day.
            </h1>
            <p className=" text-base md:text-lg">
              Manage tasks, stay focused, and get things done.
            </p>

            <Button to="/tasks" className="mt-6">
              Manage Your Day
            </Button>
          </CardWrapper>
        </section>
      </Container>
    </div>
  )
}
