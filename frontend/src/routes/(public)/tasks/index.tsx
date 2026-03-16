import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/tasks/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tasks/"!</div>
}
