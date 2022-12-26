import { mediaType } from '@hapi/accept'

export const getSupportedMimeType = (
  options: string[],
  accept = ''
): string => {
  const mimeType = mediaType(accept, options)
  return accept.includes(mimeType) ? mimeType : ''
}
