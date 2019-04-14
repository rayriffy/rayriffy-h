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
              console.log(dark)
              return (
                <Row>
                  <Col
                    xs={{span: 20, offset: 2}}
                    sm={{span: 16, offset: 4}}
                    md={{span: 12, offset: 6}}
                    lg={{span: 8, offset: 8}}>
                    {state === 0 || state === 3 ? (
                      <Card style={{backgroundColor: dark ? '#3c3c3d' : '#fff'}}>
                        <Row>
                          <Title level={2} style={{color: dark ? '#e1e1e1' : 'rgba(0, 0, 0, 0.85)'}}>
                            Gallery
                          </Title>
                          {state === 0 ? (
                            <p style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}>
                              Usage{' '}
                              <Text code style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}>
                                {siteUrl}/g/:id
                              </Text>
                            </p>
                          ) : (
                            <p style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}>Your request ID is not found</p>
                          )}
                        </Row>
                      </Card>
                    ) : state === 1 ? (
                      <Card style={{backgroundColor: dark ? '#3c3c3d' : '#fff'}}>
                        <Row>
                          <Title level={2} style={{color: dark ? '#e1e1e1' : 'rgba(0, 0, 0, 0.85)'}}>
                            Gallery
                          </Title>
                          <Skeleton active />
                        </Row>
                      </Card>
                    ) : (
                      <div>any</div>
                    )}
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
