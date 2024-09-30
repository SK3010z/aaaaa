import axios from 'axios'

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
})

export const paramsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PARAMS_API_URL,
})

export const paramsV2Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PARAMSV2_API_URL,
})
