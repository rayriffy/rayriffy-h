import React from 'react'

import { NextPage } from 'next'

import { MediaCard } from '../core/components/mediaCard'

const Page: NextPage = props => {
  return (
    <div className="max-w-lg pt-6 mx-auto px-4">
      <MediaCard
        media="https://media.tenor.com/videos/93fa0ad60fa238a9c88cf69e2d4de5c0/mp4"
        title="Not Found"
        subtitle="The page your're looking for is not found"
      />
    </div>
  )
}

export default Page
