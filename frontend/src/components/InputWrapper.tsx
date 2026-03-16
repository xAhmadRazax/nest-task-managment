import { Field } from './ui/field'

export const FieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Field
      className="bg-primary/10 shadow-none rounded-lg px-4 py-2.5 justify-center backdrop-blur-3xl 
            ring-1 ring-primary/50"
    >
      {children}
    </Field>
  )
}
