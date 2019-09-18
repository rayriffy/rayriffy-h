import _ from 'lodash'

export const getIdByUrl = (url: string) => {
  const requestedID = url.split('/')[2]

  if (!_.isEmpty(requestedID)) {
    return requestedID
  } else {
    return null
  }
}
