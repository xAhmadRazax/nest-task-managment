import React from 'react'
import type { User } from 'types/user.type'

export const NavbarUserProfile = ({ user }: { user: User }) => {
  return <div>{user.name}</div>
}
