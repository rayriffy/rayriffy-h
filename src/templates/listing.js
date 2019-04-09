import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row, Col, Card, Tag, message} from 'antd'

import LazyLoad from 'react-lazyload'

import {App} from '../components/app'

const {Meta} = Card

export default class ListingTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw} = this.props.pageContext

    const success = () => {
      const hide = message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    }

    return (
      <App title={siteTitle} subtitle={`listing`} htmlTitle={siteTitle}>
        <Row gutter={16} type="flex" justify="space-around" align="middle" key="grid-row">
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
                  <a href={`/c/${node.data.id}`} onClick={success}>
                    <Card
                      style={{borderRadius: '10px'}}
                      hoverable
                      cover={
                        <LazyLoad>
                          <img
                            style={{borderRadius: '10px 10px 0 0'}}
                            alt="cover"
                            src={`https://t.nhentai.net/galleries/${node.data.raw.media_id}/cover.${
                              node.data.raw.images.cover.t === 'p' ? 'png' : 'jpg'
                            }`}
                          />
                        </LazyLoad>
                      }
                      key={`card-${node.data.id}`}>
                      <Meta
                        title={node.data.raw.title.pretty}
                        description={node.data.raw.tags.map(tag => {
                          if (tag.type === 'tag') {
                            return (
                              <Tag color="blue" key={`tag-${node.data.id}-${tag.id}`}>
                                {tag.name}
                              </Tag>
                            )
                          } else if (tag.type === 'parody') {
                            return (
                              <Tag color="orange" key={`parody-${node.data.id}-${tag.id}`}>
                                {tag.name}
                              </Tag>
                            )
                          }
                        })}
                        meta={`meta-${node.data.id}`}
                      />
                    </Card>
                  </a>
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
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
