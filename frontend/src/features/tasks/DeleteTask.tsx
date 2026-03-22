import { Button } from '#/components/Button'
import { CardWrapper } from '#/components/CardWrapper'
import { ModalContext } from '#/components/Modal'
import React, { useContext } from 'react'
import { useDeleteTask } from './hooks/useDeleteTask'
import { Route } from '#/routes/_protected/tasks/$taskId'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Spinner } from '#/components/ui/spinner'
import { isAxiosError } from 'axios'

export const DeleteTask = ({
  id,
  navigateAway = true,
}: {
  id: string
  navigateAway?: boolean
}) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { close } = useContext(ModalContext)
  const { taskId } = Route.useParams()
  const { deleteTaskStatusMutation, isLoading } = useDeleteTask(id)
  return (
    <CardWrapper className="max-w-[min(95%,550px)] space-y-4">
      <h2 className="text-xl">Delete Task</h2>
      <p>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="flex justify-between">
        <Button
          disabled={isLoading}
          onClick={close}
          type="button"
          className="w-fit"
        >
          {isLoading && <span>{<Spinner />}</span>}
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            toast.info('Deletion Process is in action')
            deleteTaskStatusMutation(
              { taskId: id },
              {
                onSuccess: () => {
                  if (navigateAway) {
                    toast.success('Task has been deleted successfully')
                    navigate({ to: '/tasks', replace: true })

                    queryClient.removeQueries({
                      queryKey: ['task', id.toString()],
                    })
                  } else {
                    toast.success('Subtask has been deleted successfully')
                    queryClient.invalidateQueries({
                      queryKey: ['task', taskId],
                    })
                  }

                  queryClient.invalidateQueries({ queryKey: ['tasks'] })

                  close()
                },
                onError: (err) => {
                  const message = isAxiosError(err)
                    ? err.response?.data?.message
                    : 'Something went wrong, please try later'
                  toast.error(message)
                },
              },
            )
          }}
          type="button"
          className="w-fit bg-red-500/60 hover:bg-red-500/50"
        >
          {isLoading && <span>{<Spinner />}</span>}
          {isLoading ? 'Deleting Task...' : 'Delete Task'}
        </Button>
      </div>
    </CardWrapper>
  )
}
