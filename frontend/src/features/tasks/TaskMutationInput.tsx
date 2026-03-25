import { CalendarField } from '#/components/CalenderField'
import { InputField } from '#/components/InputField'
import { InputTextarea } from '#/components/InputTextarea'
import { FieldWrapper } from '#/components/InputWrapper'
import { FieldLabel } from '#/components/ui/field'
import { Controller } from 'react-hook-form'
import type {
  UseFormRegister,
  Control,
  FieldErrors,
  Path,
  UseFormClearErrors,
  FieldNamesMarkedBoolean,
} from 'react-hook-form'
import type { CreateTaskDto } from '#/types/task.types'
import { addDays } from 'date-fns'

interface PropType {
  register: UseFormRegister<CreateTaskDto>
  control: Control<CreateTaskDto>
  errors: FieldErrors<CreateTaskDto>
  index?: number
  dueDate?: Date
  clearErrors?: UseFormClearErrors<CreateTaskDto>
  touchedFields?: FieldNamesMarkedBoolean<CreateTaskDto>
}

export const TaskMutationInput = ({
  register,
  control,
  errors,
  index,
  dueDate,
  clearErrors,
  touchedFields,
}: PropType) => {
  const prefix = index !== undefined ? `subTasks.${index}.` : ''
  return (
    <>
      {' '}
      <FieldWrapper>
        <FieldLabel htmlFor={`${prefix}title`}>Title*</FieldLabel>
        <InputField
          {...register(`${prefix}title` as Path<CreateTaskDto>, {
            required: `${prefix}Title is required`,
            minLength: {
              value: 3,
              message: 'min length cant be less than 3',
            },
          })}
          error={
            index !== undefined
              ? !!errors.subTasks?.[index]?.title?.message
              : !!errors.title?.message
          }
        />
      </FieldWrapper>
      {/* description field */}
      <FieldWrapper>
        <FieldLabel htmlFor={`${prefix}description`}>Description</FieldLabel>
        <InputTextarea
          {...register(`${prefix}description` as Path<CreateTaskDto>)}
        />
      </FieldWrapper>
      {/* timeDuration */}
      <FieldWrapper>
        <FieldLabel htmlFor={`${prefix}dueDate`}>Due Date*</FieldLabel>
        <Controller
          name={`${prefix}dueDate` as Path<CreateTaskDto>}
          rules={{ required: 'Due date is required' }}
          control={control}
          render={({ field }) => (
            <CalendarField
              date={field.value as Date}
              onSelect={(date) => {
                field.onChange(date?.toISOString())
                clearErrors?.('dueDate')
              }}
              disableBefore={new Date()}
              disableAfter={dueDate}
              error={
                index !== undefined
                  ? touchedFields?.subTasks?.[index]?.dueDate &&
                    Boolean(errors.subTasks?.[index]?.dueDate?.message)
                  : Boolean(errors.dueDate?.message)
              }
            />
          )}
        />
      </FieldWrapper>
    </>
  )
}
