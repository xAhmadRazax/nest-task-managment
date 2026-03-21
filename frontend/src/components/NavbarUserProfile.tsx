import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { User } from '#/types/user.type'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useLogout } from '#/features/auth/hooks/useLogout'

export const NavbarUserProfile = ({ user }: { user: User }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { logoutHandler } = useLogout()
  return (
    <Menubar className="border-0 hover:bg-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-inherit cursor-pointer rounded-full shadow-[0_0_5px_3px_transparent] px-0 py-0 hover:shadow-secondary/20 ring-1 ring-primary-foreground/40 ">
          <Avatar className="grid place-content-center">
            <AvatarImage src="https://github.com/shadcn.pngasd" />
            <AvatarFallback className="bg-inherit text-primary-foreground">
              CN
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className="bg-primary-foreground/40 text-slate-950  ">
          <MenubarGroup>
            <MenubarItem
              onClick={() => navigate({ to: '/profile', replace: true })}
            >
              Profile
            </MenubarItem>
            <MenubarItem
              onClick={() => {
                logoutHandler(undefined, {
                  onSuccess: () => {
                    queryClient.clear()
                    navigate({ to: '/', replace: true })
                  },
                })
              }}
            >
              Logout
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
