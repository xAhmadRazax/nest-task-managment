import { getMe, loginApi, registerApi } from '#/lib/auth.service'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import type { LoginPropType, RegisterPropType } from 'types/auth.types'

export const meQueryOptions = queryOptions({
  queryKey: ['auth', 'me'],
  queryFn: getMe,
  retry: false, // Don't retry 401s — user is just not logged in
  staleTime: Infinity, // Session doesn't go stale; invalidate manually on logout
})

export const loginMutationOption = mutationOptions({
  mutationKey: ['loginUser'],
  mutationFn: ({ email, password }: LoginPropType) =>
    loginApi({ email, password }),
  onError: (err) => {},
  onSuccess: () => {},
})
export const registerMutationOption = mutationOptions({
  mutationKey: ['register'],
  mutationFn: ({ name, email, password }: RegisterPropType) =>
    registerApi({ name, email, password }),
  onError: (err) => {},
  onSuccess: () => {},
})
