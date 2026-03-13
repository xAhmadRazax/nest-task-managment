import { Link } from '@tanstack/react-router'

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
          <Link
            // to="/register"
            to="/login"
            className="bg-white/10 border border-white/20 backdrop:md text-emerald-200 hover:bg-white/20 px-4 py-2 transition-all rounded-3xl font-medium"
          >
            Manage Your Day
          </Link>
        </li>
      </ul>
    </nav>
  )
}
