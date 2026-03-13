export const CardWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`bg-emerald-200/10  py-10 px-4 rounded-4xl backdrop-blur-3xl ${className}`}
    >
      {children}
    </div>
  )
}
