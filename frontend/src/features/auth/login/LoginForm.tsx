import { useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { useLogin } from '../hooks/useLogin'
import type { User } from '#/types/user.type'
import { useQueryClient } from '@tanstack/react-query'
import { meQueryOptions } from '#/queries/auth.query'
import { Route } from '#/routes/_auth/login/route'
import { FieldLabel } from '@/components/ui/field'
import { FieldWrapper } from '#/components/InputWrapper'
import { InputField } from '#/components/InputField'
import { Button } from '#/components/Button'
import { toast } from 'sonner'
import { Spinner } from '#/components/ui/spinner'
import { isAxiosError } from 'axios'

export const LoginForm = () => {
  const queryClient = useQueryClient()
  const { redirect: redirectTo } = Route.useSearch()
  const navigate = useNavigate()
  const { loginHandler, isLoading } = useLogin()
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
          toast.success('user Login successfully')
          queryClient.setQueryData(meQueryOptions.queryKey, user.user)
          navigate({ to: redirectTo || '/', replace: true })
        },
        onError: (err) => {
          const message = isAxiosError(err)
            ? err.response?.data?.message
            : 'Something went wrong, please try later'
          toast.error(message)
        },
      },
    )
  }

  return (
    <form
      onSubmit={submitHandler}
      action=""
      method="post"
      className=" mt-12 space-y-6"
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
        <Button disabled={isLoading} type="button">
          {isLoading && <Spinner />}
          {isLoading ? 'Logging In...' : 'Login '}
        </Button>
      </div>
    </form>
  )
}
