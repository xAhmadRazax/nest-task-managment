import { AppLayout } from '#/components/AppLayout'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AppLayout />
}
