import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
})

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 30_000, // ← if preloaded within 30s, don't re-run beforeLoad
  // this setting
  scrollRestoration: true,
  context: {
    queryClient: queryClient,
  },

  // Optional: show a loading indicator during route transitions
  defaultPendingComponent: () => <div className="loading-bar" />,
  // Optional: show error boundary for failed loaders
  defaultErrorComponent: ({ error }) => <div>Route Error: {error.message}</div>,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
    </QueryClientProvider>,
  )
}
