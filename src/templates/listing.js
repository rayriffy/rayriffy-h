import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row, Pagination} from 'antd'

import {App} from '../components/app'
import {Poster} from '../components/poster'

const ListingTemplate = props => {
  const [render, setRender] = useState([])
  const [page, setPage] = useState(1)

  const siteTitle = props.data.site.siteMetadata.title

  const {raw, subtitle} = props.pageContext

  const chunks = _.chunk(raw, 20)

  const changePage = page => {
    // Render new chunk
    const chunk = _.get(chunks, page - 1)
    // Set state
    setRender(chunk)
    setPage(page)
  }

  useEffect(() => {
    setRender(_.get(chunks, 0))
  }, [])

  return (
    <App title={siteTitle} subtitle={subtitle}>
      <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />
      <Row gutter={16} type="flex" justify="space-around" align="middle" key="grid-row">
        {render.map(node => {
          if (node.status === 'success') {
            const {raw} = node.data
            return <Poster raw={raw} key={`poster-${raw.id}`} />
          }
        })}
      </Row>
      <Row type="flex" justify="center">
        <Pagination defaultCurrent={1} current={page} defaultPageSize={20} total={raw.length} onChange={changePage} />
      </Row>
    </App>
  )
}

export default ListingTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

ListingTemplate.propTypes = {
  pageContext: PropTypes.shape({
    raw: PropTypes.array,
    subtitle: PropTypes.string,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
