import { Login } from '#/pages/Login'
import { meQueryOptions } from '#/queries/auth.query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Suspense } from 'react'
import z from 'zod'

// Validate the `redirect` search param from URL
const loginSearchSchema = z.object({
  redirect: z.string().optional().catch('/'),
})

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  beforeLoad: async ({ context: { user } }) => {
    if (user?.email) {
      throw redirect({ to: '/' })
    }
  },

  validateSearch: loginSearchSchema,
})

function RouteComponent() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <Login />
    </div>
  )
}
