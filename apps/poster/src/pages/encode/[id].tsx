import React from 'react'

import { useRouter } from 'next/router'

import Poster from '../../templates/poster/components'

const EncodePage: React.FC = props => {
  const router = useRouter()
  const id = router.query.id as string

  return <React.Fragment>{id && <Poster id={id} />}</React.Fragment>
}

export default EncodePage
