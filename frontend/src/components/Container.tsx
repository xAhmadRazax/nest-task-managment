import { cn } from '#/lib/utils'
import React from 'react'

export const Container = ({
  children,
  className: classLists,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        `max-w-[min(95%,1380px)]  w-full h-full mx-auto`,
        classLists,
      )}
    >
      {children}
    </div>
  )
}
