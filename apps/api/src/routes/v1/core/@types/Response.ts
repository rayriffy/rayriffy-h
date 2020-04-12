export interface Response<T> {
  status: 'success' | 'failed'
  code: number
  response: {
    message: string
    data?: T
  }
}
