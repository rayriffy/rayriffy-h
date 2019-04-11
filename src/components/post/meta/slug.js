import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import {Collapse, Tag, message} from 'antd'

const {Panel} = Collapse

export class Slug extends React.Component {
  render() {
    const {id, tags, tagStack} = this.props

    const sortedTags = {}
    _.each(tags, tag => {
      if (_.isEmpty(sortedTags[tag.type])) sortedTags[tag.type] = []
      sortedTags[tag.type].push(tag)
    })

    const success = () => {
      const hide = message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    }

    return (
      <Collapse style={{backgroundColor: 'transparent'}} bordered={false} defaultActiveKey={['meta-tag']}>
        {Object.keys(sortedTags).map(key => {
          return (
            <Panel header={_.capitalize(key)} key={`meta-${key}`}>
              {sortedTags[key].map(tag => {
                return (
                  <a href={`/${tagStack[tag.type].prefix}/${tag.id}`} onClick={success} key={`tag-${id}-${tag.id}`}>
                    <Tag color={tagStack[tag.type].color}>{tag.name}</Tag>
                  </a>
                )
              })}
            </Panel>
          )
        })}
      </Collapse>
    )
  }
}

Slug.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.array,
  tagStack: PropTypes.object,
}
