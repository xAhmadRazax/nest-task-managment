import { CardWrapper } from '#/components/CardWrapper'
import { Container } from '#/components/Container'

import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '#/components/Button'
import { TaskMutationInput } from './TaskMutationInput'
import type { CreateTaskDto, TasksType } from '#/types/task.types'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { ModalContext } from '#/components/Modal'
import { useTaskMutation } from './hooks/useTaskMutation'
import { toast } from 'sonner'
import { Spinner } from '#/components/ui/spinner'
import { isAxiosError } from 'axios'

export const TaskMutationForm = ({ task }: { task?: TasksType }) => {
  const searchParams = useSearch({ strict: false })
  const queryClient = useQueryClient()
  const { close } = useContext(ModalContext)
  const navigate = useNavigate()
  const { taskMutationHandler, isLoading } = useTaskMutation(
    searchParams,
    task && task.id,
  )

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

  console.log(errors)

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
      toast.info('Task Creation Process is in action, please wait')
      taskMutationHandler(data, {
        onSuccess: () => {
          toast.info('Task has been added successfully')
          navigate({ to: '/tasks', replace: true, search: searchParams })
        },
        onError: (err) => {
          toast.error(
            err.message ||
              'Something went wrong while creating Task, please try later',
          )
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
          reset()
          close()
        },
      })
    } else {
      toast.info('Task Updating Process is in action, please wait')
      taskMutationHandler(data, {
        onSuccess: (updatedTask) => {
          toast.success('Task has been updated successfully')
          queryClient.setQueryData(['task', task.id.toString()], updatedTask)
          reset()
          close()
          navigate({ to: '/tasks', replace: true, search: searchParams })
        },
        onError: (err) => {
          const message = isAxiosError(err)
            ? err.response?.data?.message
            : 'Something went wrong, please try later'
          toast.error(message)
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
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
                    disabled={isLoading}
                    onClick={() => onRemoveSubTaskHandler(i)}
                    type="button"
                    className="bg-red-800 hover:bg-red-800/80 ring-red-900 w-5/6 w-auto ml-auto"
                  >
                    {isLoading && <span>{<Spinner />}</span>}
                    Delete Subtask
                  </Button>
                </div>
              ))}
            </div>
            <div className="btn-container space-y-6 ">
              <Button
                disabled={isLoading}
                type="button"
                isSubmitButton={false}
                onClick={onAddSubTaskHandler}
                className="ml-auto block w-auto"
              >
                {isLoading && <span>{<Spinner />}</span>}
                Add subTask
              </Button>

              {Object.keys(errors).length > 0 && (
                <p className="text-xs text-primary-foreground/90">
                  Required inputs are missing
                </p>
              )}

              <Button disabled={isLoading} type="button" isSubmitButton>
                {isLoading && <span>{<Spinner />}</span>}
                {task && task.id
                  ? isLoading
                    ? 'Updating Task...'
                    : 'Update Task'
                  : isLoading
                    ? 'Creating Task...'
                    : 'Add Task'}
              </Button>
            </div>
          </form>
        </CardWrapper>
      </Container>
    </section>
  )
}
