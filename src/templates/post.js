import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row, Col, Typography, Tag, Divider, Icon, Button} from 'antd'

import {App} from '../components/app'

const {Title, Text} = Typography

export default class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.dataJson
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw} = this.props.pageContext

    const pages = raw.images.pages

    return (
      <App title={siteTitle} subtitle={`viewing`}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${raw.title.pretty} · ${siteTitle}`} />
        <Row style={{maxHeight: '460px'}} key="row-meta">
          <Col
            xs={{span: 10, offset: 2}}
            sm={{span: 8, offset: 4}}
            md={{span: 6, offset: 6}}
            lg={{span: 4, offset: 8}}
            key="col-cover">
            <img
              alt="cover"
              style={{width: '100%', height: 'auto'}}
              src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${raw.images.cover.t === 'p' ? 'png' : 'jpg'}`}
            />
          </Col>
          <Col
            xs={{span: 9, offset: 1}}
            sm={{span: 7, offset: 1}}
            md={{span: 5, offset: 1}}
            lg={{span: 3, offset: 1}}
            key="col-meta">
            <Row key="meta-title">
              <Title level={3}>{raw.title.pretty}</Title>
            </Row>
            <Row key="meta-tag">
              <Text strong style={{marginRight: 8, display: 'inline'}}>
                Tag
              </Text>
              {raw.tags.map(tag => {
                if (tag.type === 'tag') {
                  return (
                    <Tag color="blue" key={`tag-${raw.id}-${tag.id}`}>
                      {tag.name}
                    </Tag>
                  )
                }
              })}
            </Row>
            <Row key="meta-buttons">
              <Button
                type="primary"
                shape="circle"
                style={{marginTop: '20px', marginRight: '10px'}}
                key="button-share"
                disabled>
                <Icon type="share-alt" />
              </Button>
              <Button shape="circle" style={{marginTop: '20px'}} key="button-export">
                <a href={`https://nhentai.net/g/${raw.id}`} target="_blank" rel="noopener noreferrer">
                  <Icon type="export" />
                </a>
              </Button>
            </Row>
          </Col>
        </Row>
        <Divider>
          <Icon type="book" theme="outlined" />
        </Divider>
        <Row key="row-images">
          {pages.map((page, i) => {
            if (!post.exclude.includes(i + 1)) {
              return (
                <Col
                  xs={{span: 24, offset: 0}}
                  sm={{span: 22, offset: 1}}
                  md={{span: 20, offset: 2}}
                  lg={{span: 16, offset: 4}}
                  xl={{span: 12, offset: 6}}
                  key={`image-${raw.id}-${i + 1}`}>
                  <img
                    style={{width: '100%'}}
                    src={`https://i.nhentai.net/galleries/${raw.media_id}/${i + 1}.${page.t === 'p' ? 'png' : 'jpg'}`}
                  />
                </Col>
              )
            }
          })}
        </Row>
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
