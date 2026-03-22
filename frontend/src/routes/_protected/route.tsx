import { AppLayout } from '#/components/AppLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: async ({ context: { user } }) => {
    console.log(user)
    if (!user?.email) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return <AppLayout />
}
