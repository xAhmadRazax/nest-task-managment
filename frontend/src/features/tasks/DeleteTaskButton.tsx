import { Button } from '#/components/Button'
import { Modal } from '#/components/Modal'
import React from 'react'
import { DeleteTask } from './DeleteTask'

export const DeleteTaskButton = ({
  id,
  navigateAway = true,
}: {
  id: string
  navigateAway?: boolean
}) => {
  return (
    <Modal>
      <Modal.Open opens="add-task-form">
        <Button
          type="button"
          className="bg-red-500/60 w-fit hover:bg-red-500/50"
        >
          Delete
        </Button>
      </Modal.Open>

      <Modal.Window name="add-task-form">
        <DeleteTask navigateAway={navigateAway} id={id} />
      </Modal.Window>
    </Modal>
  )
}
