import React from 'react'

export const Container = ({
  children,
  className: classLists,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`max-w-345  w-full h-full mx-auto ${classLists}`}>
      {children}
    </div>
  )
}
