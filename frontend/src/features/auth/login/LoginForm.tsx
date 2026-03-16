import { useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { useLogin } from '../hooks/useLogin'
import type { User } from 'types/user.type'
import { useQueryClient } from '@tanstack/react-query'
import { meQueryOptions } from '#/queries/auth.query'
import { Route } from '#/routes/_auth/login/route'
import { FieldLabel } from '@/components/ui/field'
import { FieldWrapper } from '#/components/InputWrapper'
import { InputField } from '#/components/InputField'
import { Button } from '#/components/Button'

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
    <form
      onSubmit={submitHandler}
      action=""
      method="post"
      className=" mt-12 space-y-12"
    >
      <FieldWrapper>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <InputField id="email" name="email" type="input" ref={emailRef} />
      </FieldWrapper>

      <FieldWrapper>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <InputField
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
        />
      </FieldWrapper>

      <div className="button-container flex ">
        <Button type="button">Login</Button>
      </div>
    </form>
  )
}
