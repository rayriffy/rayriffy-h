import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import {DarkThemeConsumer} from '../../../context/DarkTheme'

import {Collapse, Tag, message} from 'antd'

import slugStyle from './slug.module.css'

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
            <DarkThemeConsumer>
              {dark => {
                return (
                  <Collapse className={slugStyle.collapse} bordered={false} defaultActiveKey={['meta-tag']}>
                    {Object.keys(orderedTags).map(key => {
                      const stack = _.filter(tagStack, o => o.node.name === key)[0]
                      return (
                        <Panel
                          header={
                            <div style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.85)'}}>{_.capitalize(stack.node.name)}</div>
                          }
                          showArrow={false}
                          key={`meta-${stack.node.name}`}>
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
                  </Collapse>
                )
              }}
            </DarkThemeConsumer>
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
