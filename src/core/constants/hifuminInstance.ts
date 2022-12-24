import axios from 'axios'

export const hifuminInstance = axios.create({
  baseURL: process.env.HIFUMIN_API_URL,
  headers: {
    'Accept-Encoding': '*',
  },
})
