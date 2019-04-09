import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import {Row, Col, Layout, Typography, Card, Tag} from 'antd'
import 'antd/dist/antd.css'

import LazyLoad from 'react-lazyload'

const {Footer, Content} = Layout
const {Title} = Typography
const {Meta} = Card

class MainPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw} = this.props.pageContext

    return (
      <div>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />
        <Layout>
          <Content style={{padding: '0 25px'}}>
            <Row>
              <Title style={{fontSize: '42px', marginTop: '20px', marginLeft: '15px', fontWeight: 700}}>Riffy H</Title>
            </Row>
            <Row gutter={16} type="flex" justify="space-around" align="middle">
              {raw.map(node => {
                if (node.status === 'success') {
                  return (
                    <Col
                      style={{padding: '5px 5px'}}
                      xs={{span: 24}}
                      sm={{span: 12}}
                      md={{span: 8}}
                      lg={{span: 6}}
                      xl={{span: 4}}
                      key={`grid-${node.data.id}`}>
                      <a href={`/c/${node.data.id}`} target="_blank" rel="noopener noreferrer">
                        <Card
                          hoverable
                          cover={
                            <LazyLoad>
                              <img
                                alt="cover"
                                src={`https://t.nhentai.net/galleries/${node.data.raw.media_id}/cover.${
                                  node.data.raw.images.cover.t === 'p' ? 'png' : 'jpg'
                                }`}
                              />
                            </LazyLoad>
                          }>
                          <Meta
                            title={node.data.raw.title.pretty}
                            description={node.data.raw.tags.map(tag => {
                              if (tag.type === 'tag') {
                                return <Tag color="#108ee9">{tag.name}</Tag>
                              } else if (tag.type === 'parody') {
                                return <Tag color="#f50">{tag.name}</Tag>
                              }
                            })}
                          />
                        </Card>
                      </a>
                    </Col>
                  )
                }
              })}
            </Row>
          </Content>
          <Footer>
            Fork this project on <a href="https://github.com/rayriffy/rayriffy-h">GitHub</a>
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default MainPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

MainPage.propTypes = {
  pageContext: PropTypes.shape({
    raw: PropTypes.array,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
