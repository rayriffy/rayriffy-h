import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row} from 'antd'

import {App} from '../components/app'
import {Poster} from '../components/poster'

export default class ListingTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw, subtitle, tagStack} = this.props.pageContext

    return (
      <App title={siteTitle} subtitle={subtitle} tagStack={tagStack}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />
        <Row gutter={16} type="flex" justify="space-around" align="middle" key="grid-row">
          {raw.map(node => {
            if (node.status === 'success') {
              const {raw} = node.data
              return <Poster raw={raw} key={`poster-${raw.id}`} tagStack={tagStack} />
            }
          })}
        </Row>
      </App>
    )
  }
}

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
    tagStack: PropTypes.object,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
