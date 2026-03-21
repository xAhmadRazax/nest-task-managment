import { NavLinks } from './NavLinks'
import { Link } from '@tanstack/react-router'
import { Container } from './Container'
import { NavbarUserProfile } from './NavbarUserProfile'
import { Route } from '#/routes/__root'

export const Header = () => {
  const { user } = Route.useRouteContext()
  return (
    <header className="bg-emerald-800/30 backdrop-blur-3xl  border-b-2 border-emerald-800 h-14 px-4">
      <Container className="flex items-center justify-between ">
        <Link
          to="/"
          className="text-lg  sm:text-xl font-semibold text-primary-foreground"
        >
          <h1>R-N Tasks</h1>
        </Link>
        {user?.email ? <NavbarUserProfile user={user} /> : <NavLinks />}
      </Container>
    </header>
  )
}
