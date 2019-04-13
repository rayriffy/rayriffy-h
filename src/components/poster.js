import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import {DarkThemeConsumer} from '../context/DarkTheme'

import {Col, Card, Tag, message} from 'antd'

import LazyLoad from 'react-lazyload'

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
            <DarkThemeConsumer>
              {dark => {
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
                      style={{backgroundColor: dark ? '#3c3c3d' : '#fff'}}
                      className={posterStyle.card}
                      hoverable
                      cover={
                        <a href={`/r/${raw.id}`} onClick={success}>
                          <LazyLoad>
                            <img
                              className={posterStyle.cover}
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
                        title={<div style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}>{raw.title.pretty}</div>}
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
            </DarkThemeConsumer>
          )
        }}
      />
    )
  }
}

Poster.propTypes = {
  raw: PropTypes.object,
}
