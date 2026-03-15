import { logoutMutationOption } from '#/queries/auth.query'
import { useMutation } from '@tanstack/react-query'

export function useLogout() {
  const {
    mutate: logoutHandler,
    error,
    isPending: isLoading,
  } = useMutation(logoutMutationOption)
  return { logoutHandler, error, isLoading }
}
