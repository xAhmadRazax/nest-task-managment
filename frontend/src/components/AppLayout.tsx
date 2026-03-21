import { Outlet } from '@tanstack/react-router'
import { Header } from './Header'

export const AppLayout = () => {
  return (
    <div>
      <Header />
      <main className="overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
