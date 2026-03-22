import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'

import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '#/components/Button'
import { TaskMutationInput } from './TaskMutationInput'
import type { CreateTaskDto, TasksType } from '#/types/task.types'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { ModalContext } from '#/components/Modal'
import { useTaskMutation } from './hooks/useUpdateTask'
import { id } from 'date-fns/locale'

export const TaskMutationForm = ({ task }: { task?: TasksType }) => {
  const queryClient = useQueryClient()
  const { close } = useContext(ModalContext)
  const navigate = useNavigate()
  const { taskMutationHandler } = useTaskMutation(task && task.id)

  const {
    register,
    control,
    setFocus,
    setError,
    getValues,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, touchedFields },
  } = useForm<CreateTaskDto>({
    mode: 'onBlur',
    defaultValues: task || {
      title: '',
      description: '',
      dueDate: undefined,
      subTasks: [],
    },
  })

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
    if (!task) {
      console.log('calling creation')
      taskMutationHandler(data, {
        onSuccess: () => {
          reset()
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
          close()
          navigate({ to: '/tasks', replace: true })
        },
      })
    } else {
      console.log('calling updation')
      taskMutationHandler(data, {
        onSuccess: () => {
          reset()
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
          close()
          navigate({ to: '/tasks', replace: true })
        },
      })
    }
  }

  return (
    <section className="">
      <Container className="">
        <CardWrapper className="max-w-[min(95%,550px)] max-h-150 overflow-auto mx-auto">
          <header>
            <h2>{task && task.id ? 'Update Task' : 'Add New Task'}</h2>
          </header>

          <form
            action=""
            method="post"
            className=" mt-12 space-y-6"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <TaskMutationInput
              key={'init'}
              control={control}
              register={register}
              errors={errors}
            />

            <div className="ubTask space-y-6 ps-8">
              {fields.length > 0 ? <h3>SubTasks</h3> : <></>}
              {fields.map((subTasks, i) => (
                <div key={`subtask-${i}`} className="space-y-3 grid">
                  <TaskMutationInput
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
                {task && task.id ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </form>
        </CardWrapper>
      </Container>
    </section>
  )
}
