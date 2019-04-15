import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {App} from '../components/app'
import {Post} from '../components/post'

export default class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.dataJson
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw} = this.props.pageContext

    return (
      <App title={siteTitle} subtitle={`viewing`}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${raw.title.pretty} · ${siteTitle}`} />
        <Post raw={raw} post={post} />
      </App>
    )
  }
}

export const pageQuery = graphql`
  query PostBySlug($id: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    dataJson(nh_id: {eq: $id}) {
      exclude
    }
  }
`

PostTemplate.propTypes = {
  pageContext: PropTypes.shape({
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
