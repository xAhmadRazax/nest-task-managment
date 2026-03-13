import { registerMutationOption } from '#/queries/auth.query'
import { useMutation } from '@tanstack/react-query'

export function useRegister() {
  const {
    mutate: registerHandler,
    error,
    isPending: isLoading,
  } = useMutation(registerMutationOption)
  return { registerHandler, error, isLoading }
}
