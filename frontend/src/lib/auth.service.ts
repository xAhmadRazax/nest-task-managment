import { axios } from '#/ultis/axios'
import type { LoginPropType, RegisterPropType } from 'types/auth.types'
import type { User } from 'types/user.type'

export async function registerApi({
  name,
  email,
  password,
}: RegisterPropType): Promise<{ user: User; accessToken: string }> {
  const { data } = await axios.post('auth/register', {
    name,
    email,
    password,
  })
  return data
}

export async function loginApi({
  email,
  password,
}: LoginPropType): Promise<{ user: User; accessToken: string }> {
  const { data } = await axios.post('auth/login', {
    email,
    password,
  })
  return data
}

export async function getMe(): Promise<User> {
  console.log('ACTUAL FETCH HAPPENING')
  const { data } = await axios.get('/auth/me')
  return data.user
}
