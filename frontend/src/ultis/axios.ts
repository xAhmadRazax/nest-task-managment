import axios from 'axios'

const axiosInstance = axios.create({
  // since we have set proxy using vite to deal with cors now backend url will /api/v1/
  baseURL: import.meta.env.BASE_API_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'Application/json',
  },
})

export { axiosInstance as axios }
