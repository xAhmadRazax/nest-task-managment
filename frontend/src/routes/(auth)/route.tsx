import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center min-h-svh justify-center">
      <Outlet />
    </div>
  )
}
