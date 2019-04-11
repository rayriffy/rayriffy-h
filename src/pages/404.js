import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row, Col, Card, Typography} from 'antd'

import {App} from '../components/app'

const {Title} = Typography

export default class NotFoundPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <App title={`${siteTitle}`} subtitle={`error`} navigation={false}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`Not Found · ${siteTitle}`} />
        <Row>
          <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}} lg={{span: 8, offset: 8}}>
            <Card>
              <Title level={2}>Not found</Title>
              <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </Card>
          </Col>
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

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
