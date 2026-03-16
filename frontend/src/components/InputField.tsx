import { forwardRef } from 'react'
import { Input } from './ui/input'
import { cn } from '#/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          `border-primary/80 rounded-md focus-visible:border-primary/80  focus-visible:ring-primary `,
          className,
        )}
        {...props}
      />
    )
  },
)

InputField.displayName = 'Input'
