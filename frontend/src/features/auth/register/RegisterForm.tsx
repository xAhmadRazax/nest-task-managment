import { Container } from '#/components/Container'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { CardWrapper } from '#/components/CardWrapper'
import { useRegister } from '../hooks/useRegister'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { registerHandler, isLoading, error } = useRegister()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    // for now do if check later use zod parse method to deal with it
    if (!name || !email || !password) {
      return
    }

    registerHandler(
      { name, email, password },
      {
        onSuccess: () => {
          navigate({ to: '/login', replace: true })
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
            Create New Account
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
                htmlFor="name"
                className="text-sm font-bold text-slate-300/70 "
              >
                Name
              </label>
              <input
                type="type"
                name="name"
                id="name"
                ref={nameRef}
                className="block  ring-emerald-950 outline-0 border-0 grow px-2 py-1 rounded-lg ring-1 focus:ring-emerald-950/80"
              />
            </div>

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
                Register
              </button>
            </div>
          </form>

          <div>
            <div className="text-emerald-700 mx-auto mt-6 mb-3 border-b w-2/5"></div>
            <Link
              to="/"
              className="text-emerald-400/50 text-center block font-semibold underline"
            >
              Already have an account? Login here
            </Link>
          </div>
        </CardWrapper>
      </Container>
    </section>
  )
}
