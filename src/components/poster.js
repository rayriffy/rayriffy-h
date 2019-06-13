import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import {AppContextConsumer} from '../context/AppContext'

import {Col, Card, Tag, message} from 'antd'

import LazyLoad from 'react-lazyload'

import darkStyle from '../styles/dark.module.css'
import posterStyle from './poster.module.css'

const {Meta} = Card

export class Poster extends React.Component {
  render() {
    const {raw} = this.props

    const filterTags = ['tag', 'parody']

    const success = () => {
      const hide = message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    }

    return (
      <StaticQuery
        query={graphql`
          query PosterQuery {
            allTagJson {
              edges {
                node {
                  prefix
                  name
                  color
                }
              }
            }
          }
        `}
        render={data => {
          const tagStack = data.allTagJson.edges

          return (
            <AppContextConsumer>
              {({dark, blur}) => {
                return (
                  <Col
                    className={posterStyle.container}
                    xs={{span: 24}}
                    sm={{span: 12}}
                    md={{span: 8}}
                    lg={{span: 6}}
                    xl={{span: 4}}
                    key={`grid-${raw.id}`}>
                    <Card
                      className={[posterStyle.card, dark ? darkStyle.card : null].join(' ')}
                      hoverable
                      cover={
                        <a href={`/r/${raw.id}`} onClick={success} className={posterStyle.cardCover}>
                          <LazyLoad>
                            <img
                              className={posterStyle.cover}
                              style={{filter: blur ? 'blur(10px)' : null}}
                              alt="cover"
                              src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${
                                raw.images.cover.t === 'p' ? 'png' : 'jpg'
                              }`}
                            />
                          </LazyLoad>
                        </a>
                      }
                      key={`card-${raw.id}`}>
                      <Meta
                        title={<div className={dark ? darkStyle.whiteText : null}>{raw.title.pretty}</div>}
                        description={filterTags.map(filterTag => {
                          return raw.tags.map(tag => {
                            const stack = _.filter(tagStack, o => o.node.name === filterTag)[0]
                            if (tag.type === filterTag) {
                              return (
                                <a href={`/${stack.node.prefix}/${tag.id}`} key={`${tag.type}-${raw.id}-${tag.id}`}>
                                  <Tag color={stack.node.color}>{tag.name}</Tag>
                                </a>
                              )
                            }
                          })
                        })}
                        key={`meta-${raw.id}`}
                      />
                    </Card>
                  </Col>
                )
              }}
            </AppContextConsumer>
          )
        }}
      />
    )
  }
}

Poster.propTypes = {
  raw: PropTypes.object,
}
