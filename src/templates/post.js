import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {App} from '../components/app'
import {Post} from '../components/post'

export default class PostTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {exclude, raw} = this.props.pageContext

    return (
      <App title={siteTitle} subtitle={`viewing`}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${raw.title.pretty} · ${siteTitle}`} />
        <Post raw={raw} exclude={exclude} />
      </App>
    )
  }
}

export const pageQuery = graphql`
  query PostBySlug {
    site {
      siteMetadata {
        title
      }
    }
  }
`

PostTemplate.propTypes = {
  pageContext: PropTypes.shape({
    exclude: PropTypes.arrayOf(PropTypes.number),
    raw: PropTypes.object,
  }),
  data: PropTypes.shape({
    dataJson: PropTypes.object,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
