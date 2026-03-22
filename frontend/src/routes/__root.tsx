import { Toaster } from '@/components/ui/sonner'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'

import '../styles.css'
import { meQueryOptions } from '#/queries/auth.query'
import { NotFoundComponent } from '#/components/NotFoundComponent'
import { ErrorComponent } from '#/components/ErrorComponent'

export interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      // ensureQueryData: uses cache if fresh, fetches if stale/missing
      const user = await queryClient.ensureQueryData(meQueryOptions)

      return { user }
    } catch {
      return { user: null }
      // Redirect to login, preserving the intended destination
    }
  },
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
