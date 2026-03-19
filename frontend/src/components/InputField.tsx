import { forwardRef } from 'react'
import { Input } from './ui/input'
import { cn } from '#/lib/utils'
import { Textarea } from './ui/textarea'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = '', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          `border-primary/80 rounded-md focus-visible:border-primary/80  focus-visible:ring-primary `,
          className,
          error &&
            'border-destructive bg-destructive/15 focus-visible:ring-destructive  ',
        )}
        {...props}
      />
    )
  },
)

InputField.displayName = 'Input'
