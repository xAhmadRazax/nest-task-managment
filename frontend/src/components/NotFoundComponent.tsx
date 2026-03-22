import React from 'react'
import { Header } from './Header'
import { Link } from '@tanstack/react-router'

export const NotFoundComponent = () => {
  return (
    <div>
      <Header />
      <main className="overflow-auto">
        <div className="space-y-4 flex flex-col items-center justify-center h-[calc(100svh-80px)] text-primary-foreground">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-muted-foreground">Page not found</p>
          <Link className="text-lg underline" to="..">
            Go back{' '}
          </Link>
        </div>
      </main>
    </div>
  )
}
