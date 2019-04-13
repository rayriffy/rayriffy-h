import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {DarkThemeConsumer} from '../context/DarkTheme'

import {Row, Col, Card, message, Typography, List, Anchor} from 'antd'

import {App} from '../components/app'

const {Title} = Typography
const {Link} = Anchor

export default class TagTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw, subtitle, prefix} = this.props.pageContext

    const nodes = _.sortBy(raw, node => node.name)

    const sortedNodes = {}
    _.each(nodes, node => {
      if (_.isEmpty(sortedNodes[node.name.charAt(0).toLowerCase()])) sortedNodes[node.name.charAt(0).toLowerCase()] = []
      sortedNodes[node.name.charAt(0).toLowerCase()].push(node)
    })

    const success = () => {
      const hide = message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    }

    return (
      <App title={siteTitle} subtitle={subtitle}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />
        <DarkThemeConsumer>
          {dark => {
            return (
              <Row gutter={16}>
                <Col
                  xs={{span: 4, offset: 0}}
                  sm={{span: 4, offset: 1}}
                  md={{span: 4, offset: 2}}
                  lg={{span: 4, offset: 3}}
                  xl={{span: 4, offset: 4}}>
                  <Anchor style={{backgroundColor: 'transparent'}}>
                    {Object.keys(sortedNodes).map(key => {
                      return (
                        <Link
                          href={`#${key}`}
                          key={`anchor-${key}`}
                          title={<div style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}>{key.toUpperCase()}</div>}
                        />
                      )
                    })}
                  </Anchor>
                </Col>
                <Col xs={{span: 20}} sm={{span: 18}} md={{span: 16}} lg={{span: 14}} xl={{span: 12}}>
                  {Object.keys(sortedNodes).map(key => {
                    return (
                      <Card
                        id={key}
                        style={{margin: '20px 5px', borderRadius: '10px', backgroundColor: dark ? '#3c3c3d' : '#fff'}}
                        key={`col-${key}`}>
                        <Title level={3} style={{color: dark ? '#e1e1e1' : 'rgba(0, 0, 0, 0.85)'}}>
                          {key.toUpperCase()}
                        </Title>
                        <List
                          dataSource={sortedNodes[key]}
                          renderItem={item => (
                            <List.Item>
                              <a
                                href={`/${prefix}/${item.id}`}
                                onClick={success}
                                style={{color: dark ? '#3784f7' : '#1890ff'}}>
                                {item.name}
                              </a>
                            </List.Item>
                          )}
                        />
                      </Card>
                    )
                  })}
                </Col>
              </Row>
            )
          }}
        </DarkThemeConsumer>
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

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    prefix: PropTypes.string,
    raw: PropTypes.array,
    subtitle: PropTypes.string,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
