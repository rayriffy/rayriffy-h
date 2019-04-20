import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {AppContextConsumer} from '../context/AppContext'

import {Row, Col, Card, Typography} from 'antd'

import {App} from '../components/app'

import {themes} from '../themes.js'

const {Title} = Typography

export default class NotFoundPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <App title={`${siteTitle}`} subtitle={`error`}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`Not Found · ${siteTitle}`} />
        <AppContextConsumer>
          {({color}) => {
            return (
              <Row>
                <Col
                  xs={{span: 20, offset: 2}}
                  sm={{span: 16, offset: 4}}
                  md={{span: 12, offset: 6}}
                  lg={{span: 8, offset: 8}}>
                  <Card className={color in themes ? themes[color].style.card : null}>
                    <Title level={2} className={color in themes ? themes[color].style.cardTitle : null}>
                      Not found
                    </Title>
                    <p className={color in themes ? themes[color].style.cardContent : null}>
                      You just hit a route that doesn&#39;t exist... the sadness.
                    </p>
                  </Card>
                </Col>
              </Row>
            )
          }}
        </AppContextConsumer>
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
