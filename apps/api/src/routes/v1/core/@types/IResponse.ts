export interface IResponse<T> {
  status: 'success' | 'failed'
  code: number
  response: {
    message: string
    data?: T
  }
}
