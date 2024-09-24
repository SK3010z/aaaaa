import axios from 'axios'

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
})

export const paramsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PARAMS_API_URL,
})
