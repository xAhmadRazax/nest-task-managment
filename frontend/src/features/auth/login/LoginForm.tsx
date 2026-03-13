import { Container } from '#/components/Container'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { useLogin } from '../hooks/useLogin'
import type { User } from 'types/user.type'
import { useQueryClient } from '@tanstack/react-query'
import { meQueryOptions } from '#/queries/auth.query'
import { Route } from '#/routes/(auth)/login/route'
import { CardWrapper } from '#/components/CardWrapper'

export const LoginForm = () => {
  const queryClient = useQueryClient()
  const { redirect: redirectTo } = Route.useSearch()
  const navigate = useNavigate()
  const { loginHandler } = useLogin()
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    // for now do if check later use zod parse method to deal with it
    if (!email || !password) {
      return
    }

    loginHandler(
      { email, password },
      {
        onSuccess: (user) => {
          queryClient.setQueryData(meQueryOptions.queryKey, user.user)
          navigate({ to: redirectTo || '/', replace: true })
        },
      },
    )
  }

  return (
    <section onSubmit={submitHandler} className="w-full">
      <Container className="max-w-[95%] sm:w-md mt-5  w-full mx-auto ">
        <CardWrapper>
          <Link to=".." title="go-back">
            <ArrowLeft className="text-slate-200" />
          </Link>

          <h2 className="text-center text-3xl font-bold text-slate-200">
            Welcome Back!
          </h2>

          <form
            action=""
            method="post"
            className="text-slate-200 mt-12 space-y-12"
          >
            <div
              className="flex flex-col gap-1 bg-emerald-200/10 rounded-xl px-4 py-2.5 justify-center backdrop-blur-3xl 
          ring-1 ring-emerald-500/30"
            >
              <label
                htmlFor="email"
                className="text-sm font-bold text-slate-300/70 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                className="block  ring-emerald-950 outline-0 border-0 grow px-2 py-1 rounded-lg ring-1 focus:ring-emerald-950/80"
              />
            </div>

            <div
              className="flex flex-col gap-1 bg-emerald-200/10 rounded-xl px-4 py-2.5 justify-center backdrop-blur-3xl 
          ring-1 ring-emerald-500/30  "
            >
              <label
                htmlFor="password"
                className="text-sm font-bold text-slate-300/70 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                className="block   ring-emerald-950 outline-0 border-0 grow px-2 py-1 rounded-lg ring-1 focus:ring-emerald-950/80"
              />
            </div>

            <div className="button-container flex ">
              <button className="block w-full bg-emerald-200/10 cursor-pointer ring-1 ring-emerald-500/30 backdrop:md text-slate-200 hover:bg-emerald-200/20 px-4 py-2 transition-all  rounded-xl font-medium">
                Login
              </button>
            </div>
          </form>

          <div>
            <div className="text-emerald-700 mx-auto mt-6 mb-3 border-b w-2/5"></div>
            <Link
              to="/register"
              className="text-emerald-400/50 text-center block font-semibold underline"
            >
              Register now to start managing your day
            </Link>
          </div>
        </CardWrapper>
      </Container>
    </section>
  )
}
