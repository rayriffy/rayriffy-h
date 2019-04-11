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

    const {raw, tagStack} = this.props.pageContext

    return (
      <App title={siteTitle} subtitle={`viewing`} tagStack={tagStack}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${raw.title.pretty} · ${siteTitle}`} />
        <Post raw={raw} post={post} tagStack={tagStack} />
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
    tagStack: PropTypes.object,
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
