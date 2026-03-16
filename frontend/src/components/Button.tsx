import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { Button as ShadCnButton } from '@/components/ui/Button'
import { cn } from '#/lib/utils'

export interface ButtonProps {
  children: React.ReactNode
  to?: LinkProps['to']
  className?: string
  isSubmitButton?: boolean
  type?: 'button' | 'link'
}

export const Button = ({
  to,
  type = 'link',
  isSubmitButton = true,
  children,
  className,
}: ButtonProps) => {
  return (
    <>
      {type === 'button' ? (
        <ShadCnButton
          type={isSubmitButton ? 'submit' : 'button'}
          className={cn(
            'w-full bg-primary/10 cursor-pointer ring-1 ring-primary/50 backdrop-blur-3xl  hover:bg-primary/20 px-4 py-2 transition-all rounded-md font-medium',
            className,
          )}
        >
          {children}
        </ShadCnButton>
      ) : (
        <Link
          to={to}
          className={cn(
            `inline-block bg-primary/30 border border-accent/20 backdrop:md text-primary-foreground hover:bg-primary/40 px-4 py-2 transition-all rounded-3xl text-sm :md:text-base font-medium`,
            className,
          )}
        >
          {children}
        </Link>
      )}
    </>
  )
}
