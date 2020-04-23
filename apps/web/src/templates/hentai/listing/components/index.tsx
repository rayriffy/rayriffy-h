import React, { useContext, useEffect, useMemo } from 'react'

import { trackWindowScroll, LazyComponentProps } from 'react-lazy-load-image-component'

import { Poster } from '../../../../core/components/poster'

import { Subtitle } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props & LazyComponentProps> = props => {
  const { pageContext, scrollPosition } = props
  const { raw, page } = pageContext

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`listing`)
  }, [])

  return (
    <div className='flex flex-column flex-wrap'>
      <div className='w-1/3'>
        {raw.map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
        
      </div>
      <div className='w-1/3'>
        {raw.map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
    </div>
  )

  // const pagination = useMemo<React.ReactNode>(
  //   () => (
  //     <Flex justifyContent='center' pt={2}>
  //       <Box width={18 / 24} pt={3} pb={6}>
  //         <Pagination current={page.current} max={page.max} prefix='/' />
  //       </Box>
  //     </Flex>
  //   ),
  //   []
  // )

  // return (
  //   <React.Fragment>
  //     {pagination}
  //     <Flex justifyContent='center'>
  //       <Flex
  //         width={22 / 24}
  //         flexWrap='wrap'
  //         justifyContent='center'
  //         alignItems='center'>
  //         {raw.map(hentai => (
  //           <Poster key={`poster-${hentai.id}`} raw={hentai} />
  //         ))}
  //       </Flex>
  //     </Flex>
  //     {pagination}
  //   </React.Fragment>
  // )
}

export default trackWindowScroll(Page)
