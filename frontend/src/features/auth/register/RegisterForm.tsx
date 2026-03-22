import { useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { useRegister } from '../hooks/useRegister'
import { FieldWrapper } from '#/components/InputWrapper'
import { FieldLabel } from '#/components/ui/field'
import { InputField } from '#/components/InputField'
import { Button } from '#/components/Button'
import { toast } from 'sonner'
import { Spinner } from '#/components/ui/spinner'
import { isAxiosError } from 'axios'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { registerHandler, isLoading } = useRegister()
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
          toast.success('User Register successfully')
          navigate({ to: '/login', replace: true })
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
      className="mt-12 space-y-6"
    >
      <FieldWrapper>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <InputField id="name" name="name" type="input" ref={nameRef} />
      </FieldWrapper>

      <FieldWrapper>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <InputField id="email" name="email" type="input" ref={emailRef} />
      </FieldWrapper>

      <FieldWrapper>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <InputField
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
        />
      </FieldWrapper>

      <div className="button-container flex w-full ">
        <Button disabled={isLoading} type="button">
          {isLoading && <Spinner />}
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  )
}
