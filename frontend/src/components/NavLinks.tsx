import { Button } from './Button'

export const NavLinks = () => {
  return (
    <nav>
      <ul className="flex gap-6">
        {/* <li>
          <Link
            // to="/login"
            to="/login"
            className="text-emerald-200 hover:text-emerald-300 transition-all font-medium"
          >
            Login
          </Link>
        </li> */}
        <li className="">
          <Button to="/login">Manage Your Day</Button>
        </li>
      </ul>
    </nav>
  )
}
