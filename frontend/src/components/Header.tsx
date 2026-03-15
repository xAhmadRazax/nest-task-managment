import { NavLinks } from './NavLinks'
import { Link } from '@tanstack/react-router'
import { Container } from './Container'
import { NavbarUserProfile } from './NavbarUserProfile'
import { Route } from '#/routes/(public)/route'

export const Header = () => {
  const { user } = Route.useRouteContext()
  return (
    <header className="bg-emerald-200/40 h-14 px-4">
      <Container className="flex items-center justify-between ">
        <Link
          to="/"
          className="text-lg  sm:text-xl font-semibold text-primary-foreground"
        >
          <h1>R-N ToDos</h1>
        </Link>
        {user?.email ? <NavbarUserProfile user={user} /> : <NavLinks />}
      </Container>
    </header>
  )
}
