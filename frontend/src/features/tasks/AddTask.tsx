import { Button } from '#/components/Button'
import { Modal } from '#/components/Modal'
import React from 'react'
import { AddTaskForm } from './AddTaskForm'

export const AddTask = () => {
  return (
    <Modal>
      <Modal.Open opens="add-task-form">
        <Button type="button" className="w-auto rounded-4xl">
          Add Task
        </Button>
      </Modal.Open>

      <Modal.Window name="add-task-form">
        <AddTaskForm />
      </Modal.Window>
    </Modal>
  )
}
