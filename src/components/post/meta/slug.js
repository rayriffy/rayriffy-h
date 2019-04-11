import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import {Collapse, Tag, message} from 'antd'

const {Panel} = Collapse

export class Slug extends React.Component {
  render() {
    const {id, tags} = this.props

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
      <StaticQuery
        query={graphql`
          query SlugQuery {
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

          const orderedTags = {}
          _.each(tagStack, edge => {
            if (!_.isEmpty(sortedTags[edge.node.name])) orderedTags[edge.node.name] = sortedTags[edge.node.name]
          })

          return (
            <Collapse style={{backgroundColor: 'transparent'}} bordered={false} defaultActiveKey={['meta-tag']}>
              {Object.keys(orderedTags).map(key => {
                const stack = _.filter(tagStack, o => o.node.name === key)[0]
                return (
                  <Panel header={_.capitalize(stack.node.name)} key={`meta-${stack.node.name}`}>
                    {orderedTags[key].map(tag => {
                      return (
                        <a href={`/${stack.node.prefix}/${tag.id}`} onClick={success} key={`tag-${id}-${tag.id}`}>
                          <Tag color={stack.node.color}>{tag.name}</Tag>
                        </a>
                      )
                    })}
                  </Panel>
                )
              })}
              {/* {tagStack.map(edge => {
                return (
                  <Panel header={_.capitalize(edge.node.name)} key={`meta-${edge.node.name}`}>
                    {
                      if (!_.isEmpty(orderedTags[edge.node.name])) {
                        orderedTags[edge.node.name].map(tag => {
                          return (
                            <a href={`/${edge.node.prefix}/${tag.id}`} onClick={success} key={`tag-${id}-${tag.id}`}>
                              <Tag color={edge.node.color}>{tag.name}</Tag>
                            </a>
                          )
                        })
                      }
                    }
                  </Panel>
                )
              })} */}
            </Collapse>
          )
        }}
      />
    )
  }
}

Slug.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.array,
}
