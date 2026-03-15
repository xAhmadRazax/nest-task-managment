import { Header } from '#/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
