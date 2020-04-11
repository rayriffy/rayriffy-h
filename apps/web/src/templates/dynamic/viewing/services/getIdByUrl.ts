import { isEmpty } from 'lodash-es'

export const getIdByUrl = (url: string) => {
  const requestedID = url.split('/')[2]

  if (!isEmpty(requestedID)) {
    return requestedID
  } else {
    return null
  }
}
