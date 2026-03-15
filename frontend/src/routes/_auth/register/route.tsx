import { Register } from '#/pages/Register'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'

// Validate the `redirect` search param from URL
const loginSearchSchema = z.object({
  redirect: z.string().optional().catch('/'),
})

export const Route = createFileRoute('/_auth/register')({
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
    <div className=" flex items-center justify-center">
      <Register />
    </div>
  )
}
