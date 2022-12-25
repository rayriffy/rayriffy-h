import axios from 'axios'
import { env } from '$env/dynamic/private'

export const hifuminInstance = axios.create({
  baseURL: env.HIFUMIN_API_URL,
  headers: {
    'Accept-Encoding': '*',
  },
})
