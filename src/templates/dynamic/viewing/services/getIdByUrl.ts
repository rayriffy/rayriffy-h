import isEmpty from 'lodash.isempty'

export const getIdByUrl = (url: string) => {
  const requestedID = url.split('/')[2]

  if (!isEmpty(requestedID)) {
    return requestedID
  } else {
    return null
  }
}
