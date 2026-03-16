import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/tasks')({
  component: RouteComponent,
  beforeLoad: async ({ context: { user } }) => {
    console.log(user)
    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return <div>Hello "/tasks"!</div>
}
