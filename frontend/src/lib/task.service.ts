import { axios } from '#/ultis/axios'
import { isAxiosError } from 'axios'

import type { TaskInputs } from 'types/task.types'

export async function addTaskApi({
  title,
  description,
  dueDate,
  subTasks,
}: TaskInputs) {
  try {
    const { data } = await axios.post('tasks', {
      title,
      description,
      dueDate,
      subTasks,
    })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('backend error:', error.response?.data) // ← actual error
      console.log('status:', error.response?.status)
      console.log('payload sent:', { title, description, dueDate, subTasks }) // ← what you sent
    }
    throw error // ← rethrow so caller knows it failed
  }
}
