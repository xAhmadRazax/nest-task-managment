import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'

import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '#/components/Button'
import { AddTaskInput } from './AddTaskInput'
import type { CreateTaskDto } from '#/types/task.types'
import { useAddTask } from './hooks/useAddTask'
import { useNavigate } from '@tanstack/react-router'

export const AddTaskForm = () => {
  const navigate = useNavigate()
  const { addTaskHandler } = useAddTask()
  const {
    register,
    control,
    setFocus,
    setError,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors, touchedFields },
  } = useForm<CreateTaskDto>({ mode: 'onBlur' })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks',
  })

  const taskDueDate = getValues('dueDate')

  function onAddSubTaskHandler() {
    if (!taskDueDate) {
      setError('dueDate', { type: 'required', message: 'Due date is required' })
      return setFocus('dueDate')
    }
    append({
      title: '',
      description: '',
      dueDate: undefined,
    })
  }

  function onRemoveSubTaskHandler(index: number) {
    remove(index)
  }

  function onSubmitHandler(data: CreateTaskDto) {
    addTaskHandler(data, {
      onSuccess: () => {
        navigate({ to: '/tasks', replace: true })
      },
    })
  }

  return (
    <section className="">
      <Container className="">
        <CardWrapper className="max-w-[min(95%,550px)] max-h-150 overflow-auto mx-auto">
          <header>
            <h2>Add New Task</h2>
          </header>

          <form
            action=""
            method="post"
            className=" mt-12 space-y-6"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <AddTaskInput
              key={'init'}
              control={control}
              register={register}
              errors={errors}
            />

            <div className="ubTask space-y-6 ps-8">
              {fields.length > 0 ? <h3>SubTasks</h3> : <></>}
              {fields.map((subTasks, i) => (
                <div key={`subtask-${i}`} className="space-y-3 grid">
                  <AddTaskInput
                    index={i}
                    control={control}
                    errors={errors}
                    register={register}
                    dueDate={taskDueDate}
                    clearErrors={clearErrors}
                    touchedFields={touchedFields}
                  />
                  <Button
                    onClick={() => onRemoveSubTaskHandler(i)}
                    type="button"
                    className="bg-red-800 hover:bg-red-800/80 ring-red-900 w-5/6 w-auto ml-auto"
                  >
                    Delete Subtask
                  </Button>
                </div>
              ))}
            </div>
            <div className="btn-container space-y-6 ">
              <Button
                type="button"
                onClick={onAddSubTaskHandler}
                className="ml-auto block w-auto"
              >
                Add subTask
              </Button>

              <Button type="button" isSubmitButton>
                Add Task
              </Button>
            </div>
          </form>
        </CardWrapper>
      </Container>
    </section>
  )
}
