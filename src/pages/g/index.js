import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import axios from 'axios'

import {AppContextConsumer} from '../../context/AppContext'

import {Row, Col, Card, Typography, Skeleton} from 'antd'

import {App} from '../../components/app'
import {Post} from '../../components/post'

import darkStyle from '../../styles/dark.module.css'

const {Title, Text} = Typography

class GalleryPage extends React.Component {
  state = {state: 0, subtitle: 'gallery', raw: {}}

  find = async id => {
    this.setState({
      state: 1,
      subtitle: 'processing',
    })

    try {
      const out = await axios.get(`https://nh-express-git-master.rayriffy.now.sh/api/gallery/${id}`)
      this.setState({raw: out.data, state: 4, subtitle: 'viewing'})
    } catch (err) {
      console.log(err)
      this.setState({state: 3, subtitle: 'error'})
    }
  }

  componentDidMount() {
    const {location} = this.props

    const requestedID = location.pathname.split('/')[2]

    if (!_.isEmpty(requestedID)) {
      this.find(requestedID)
    }
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl

    const {state, subtitle, raw} = this.state

    return (
      <App title={siteTitle} subtitle={subtitle}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${subtitle} · ${siteTitle}`} />
        {state === 4 ? (
          <Post raw={raw} />
        ) : (
          <AppContextConsumer>
            {({dark}) => {
              return (
                <Row>
                  <Col
                    xs={{span: 20, offset: 2}}
                    sm={{span: 16, offset: 4}}
                    md={{span: 12, offset: 6}}
                    lg={{span: 8, offset: 8}}>
                    <Card className={dark ? darkStyle.card : null}>
                      <Row>
                        <Title level={2} className={dark ? darkStyle.cardTitle : null}>
                          Gallery
                        </Title>
                      </Row>
                      {state === 1 ? (
                        <Row>
                          <Skeleton active />
                        </Row>
                      ) : (
                        <Row>
                          <div className={dark ? darkStyle.cardContent : null}>
                            {state === 0 ? (
                              <p>
                                Usage{' '}
                                <Text code className={dark ? darkStyle.cardContent : null}>
                                  {siteUrl}/g/:id
                                </Text>
                              </p>
                            ) : (
                              <p>Your request ID is not found</p>
                            )}
                          </div>
                        </Row>
                      )}
                    </Card>
                  </Col>
                </Row>
              )
            }}
          </AppContextConsumer>
        )}
      </App>
    )
  }
}

export default GalleryPage

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

GalleryPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
  }),
}
