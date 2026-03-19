import { cn } from '#/lib/utils'

export const CardWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        `bg-primary/10 px-8 py-4 rounded-lg ring-1 ring-primary/80 shadow-[0_0_20px_5px] shadow-primary/20 backdrop-blur-xs mb-14 text-primary-foreground/80`,
        className,
      )}
    >
      {children}
    </div>
  )
}
