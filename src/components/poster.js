import React from 'react'
import PropTypes from 'prop-types'

import {Col, Card, Tag, message} from 'antd'

import LazyLoad from 'react-lazyload'

import posterStyle from './poster.module.css'

const {Meta} = Card

export class Poster extends React.Component {
  render() {
    const {raw, tagStack} = this.props

    const filterTags = ['tag', 'parody']

    const success = () => {
      const hide = message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    }

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
          className={posterStyle.card}
          hoverable
          cover={
            <a href={`/r/${raw.id}`} onClick={success}>
              <LazyLoad>
                <img
                  className={posterStyle.cover}
                  alt="cover"
                  src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${raw.images.cover.t === 'p' ? 'png' : 'jpg'}`}
                />
              </LazyLoad>
            </a>
          }
          key={`card-${raw.id}`}>
          <Meta
            title={raw.title.pretty}
            description={filterTags.map(filterTag => {
              return raw.tags.map(tag => {
                if (tag.type === filterTag) {
                  return (
                    <a href={`/${tagStack[tag.type].prefix}/${tag.id}`} key={`${tag.type}-${raw.id}-${tag.id}`}>
                      <Tag color={tagStack[tag.type].color}>{tag.name}</Tag>
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
  }
}

Poster.propTypes = {
  raw: PropTypes.object,
  tagStack: PropTypes.object,
}
