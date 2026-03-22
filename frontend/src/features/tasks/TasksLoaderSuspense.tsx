import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'

export const TasksLoaderSuspense = () => {
  return (
    <Container>
      <div className="  mt-18 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {Array.from({ length: 12 }, (_, i) => i).map((item) => (
          <CardWrapper key={item} className="animate-pulse h-56 mb-0">
            <></>
          </CardWrapper>
        ))}
      </div>
    </Container>
  )
}

export const TaskLoaderSuspense = () => {
  return (
    <Container className="flex items-center justify-center py-4">
      <CardWrapper className="mt-18 animate-pulse h-[70svh] max-w-[min(95%,486px)] w-full mb-0">
        <></>
      </CardWrapper>
    </Container>
  )
}
