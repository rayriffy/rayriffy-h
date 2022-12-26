export interface ResponsePayload {
  buffer: Buffer
  contentType: string | null
  maxAge: number
  etag: string
}
