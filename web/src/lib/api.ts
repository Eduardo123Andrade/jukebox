import axios from 'axios'
import { ENVIRONMENT_VARIABLES } from '@/config'

const { NEXT_PUBLIC_BASE_URL_API } = ENVIRONMENT_VARIABLES

export const API = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL_API,
})
