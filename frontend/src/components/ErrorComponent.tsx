import { Header } from './Header'
import { Link } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div>
      <Header />
      <main className="overflow-auto">
        <div className="space-y-4 flex flex-col items-center justify-center h-[calc(100svh-80px)] text-primary-foreground">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">{error.message}</p>
          <Link className="text-lg underline" to="..">
            Go back{' '}
          </Link>
        </div>
      </main>
    </div>
  )
}
