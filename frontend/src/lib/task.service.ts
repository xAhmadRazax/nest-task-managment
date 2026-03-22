import { axios } from '#/ultis/axios'
import { isAxiosError } from 'axios'

import type { CreateTaskDto, TaskStatus, TasksType } from '#/types/task.types'

export async function addTaskApi({
  title,
  description,
  dueDate,
  subTasks,
}: CreateTaskDto) {
  try {
    console.log('create Api')
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

export async function updateTaskApi(
  id: string,
  { title, description, dueDate, subTasks }: CreateTaskDto,
) {
  try {
    const { data } = await axios.patch(`tasks/${id}`, {
      title,
      description,
      dueDate,
      subTasks,
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error)) {
      console.log('backend error:', error.response?.data) // ← actual error
      console.log('status:', error.response?.status)
      console.log('payload sent:', { title, description, dueDate, subTasks }) // ← what you sent
    }
    throw error // ← rethrow so caller knows it failed
  }
}

export async function getTasksApi(): Promise<TasksType[]> {
  try {
    const { data } = await axios.get('tasks')
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('backend error:', error.response?.data) // ← actual error
      console.log('status:', error.response?.status)
    }
    throw error // ← rethrow so caller knows it failed
  }
}

export async function getTaskApi(id: string): Promise<TasksType> {
  try {
    const { data } = await axios.get(`tasks/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('backend error:', error.response?.data) // ← actual error
      console.log('status:', error.response?.status)
    }
    throw error // ← rethrow so caller knows it failed}
  }
}

export async function updateTaskStatusApi({
  id,
  status,
}: {
  id: string
  status: TaskStatus
}): Promise<TasksType> {
  try {
    const { data } = await axios.patch(`tasks/${id}/status`, {
      newStatus: status,
    })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('backend error:', error.response?.data) // ← actual error
      console.log('status:', error.response?.status)
    }
    throw error // ← rethrow so caller knows it failed}
  }
}

export async function deleteTaskApi({ id }: { id: string }): Promise<void> {
  try {
    await axios.delete(`tasks/${id}`)
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('backend error:', error.response?.data) // ← actual error
      console.log('status:', error.response?.status)
    }
    throw error // ← rethrow so caller knows it failed}
  }
}
