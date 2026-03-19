import React, { forwardRef } from 'react'
import { Textarea } from './ui/textarea'
import { cn } from '#/lib/utils'

type InputTextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
}

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  InputTextareaProps
>(({ className, error, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        'border-primary/80 rounded-md focus-visible:border-primary/80  focus-visible:ring-primary ',
        className,
        error &&
          'border-destructive bg-destructive/15 focus-visible:ring-destructive  ',
      )}
      {...props}
    ></Textarea>
  )
})
