import { Button } from '#/components/Button'
import { CardWrapper } from '#/components/CardWrapper'
import { ModalContext } from '#/components/Modal'
import React, { useContext } from 'react'
import { useDeleteTask } from './hooks/useDeleteTask'
import { Route } from '#/routes/_protected/tasks/$taskId'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

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
  // const { taskId } = Route.useParams()
  const { deleteTaskStatusMutation } = useDeleteTask(id)
  return (
    <CardWrapper className="max-w-[min(95%,550px)] space-y-4">
      <h2 className="text-xl">Delete Task</h2>
      <p>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="flex justify-between">
        <Button onClick={close} type="button" className="w-fit">
          Cancel
        </Button>
        <Button
          onClick={() =>
            deleteTaskStatusMutation(
              { taskId: id },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['tasks'] })
                  if (navigateAway) {
                    navigate({ to: '/tasks', replace: true })
                  }
                  close()
                },
              },
            )
          }
          type="button"
          className="w-fit bg-red-500/60 hover:bg-red-500/50"
        >
          Delete Task
        </Button>
      </div>
    </CardWrapper>
  )
}
