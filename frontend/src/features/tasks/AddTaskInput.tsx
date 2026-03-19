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
import type { TaskInputs } from 'types/task.types'

interface PropType {
  register: UseFormRegister<TaskInputs>
  control: Control<TaskInputs>
  errors: FieldErrors<TaskInputs>
  index?: number
  dueDate?: Date
  clearErrors?: UseFormClearErrors<TaskInputs>
  touchedFields?: FieldNamesMarkedBoolean<TaskInputs>
}

export const AddTaskInput = ({
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
          {...register(`${prefix}title` as Path<TaskInputs>, {
            required: true,
            minLength: {
              value: 3,
              message: 'min length cant be less than 3',
            },
          })}
          error={
            index !== undefined
              ? errors.subTasks?.[index]?.title?.message
              : errors.title?.message
          }
        />
      </FieldWrapper>
      {/* description field */}
      <FieldWrapper>
        <FieldLabel htmlFor={`${prefix}description`}>Description</FieldLabel>
        <InputTextarea
          {...register(`${prefix}description` as Path<TaskInputs>)}
        />
      </FieldWrapper>
      {/* timeDuration */}
      <FieldWrapper>
        <FieldLabel htmlFor={`${prefix}dueDate`}>Due Date*</FieldLabel>
        <Controller
          name={`${prefix}dueDate` as Path<TaskInputs>}
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
