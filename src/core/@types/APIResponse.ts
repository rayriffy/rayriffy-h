export interface APIResponse<T> {
  status: 'success' | 'failed'
  code: number
  response: {
    message: string
    data?: T
  }
}
