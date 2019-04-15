import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row} from 'antd'

import {App} from '../components/app'
import {Poster} from '../components/poster'

export default class ListingTemplate extends React.Component {
  state = {mounted: false}

  componentDidMount = () => {
    this.setState({mounted: true})
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw, subtitle} = this.props.pageContext
    const {mounted} = this.state

    return (
      <div>
        {mounted && (
          <App title={siteTitle} subtitle={subtitle}>
            <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />
            <Row gutter={16} type="flex" justify="space-around" align="middle" key="grid-row">
              {raw.map(node => {
                if (node.status === 'success') {
                  const {raw} = node.data
                  return <Poster raw={raw} key={`poster-${raw.id}`} />
                }
              })}
            </Row>
          </App>
        )}
      </div>
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
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
