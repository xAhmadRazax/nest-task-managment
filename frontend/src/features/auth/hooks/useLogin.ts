import { loginMutationOption } from '#/queries/auth.query'
import { useMutation } from '@tanstack/react-query'

export function useLogin() {
  const {
    mutate: loginHandler,
    error,
    isPending: isLoading,
  } = useMutation(loginMutationOption)
  return { loginHandler, error, isLoading }
}
