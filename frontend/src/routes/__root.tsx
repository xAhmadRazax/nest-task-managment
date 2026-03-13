import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'

import '../styles.css'
import { meQueryOptions } from '#/queries/auth.query'

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
})

function RootComponent() {
  return (
    <>
      <Outlet />
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
