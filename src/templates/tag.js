import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

import {Row, Col, Card, message, Typography, List, Anchor, BackTop} from 'antd'

import {App} from '../components/app'

const {Title} = Typography
const {Link} = Anchor

export default class TagTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw, subtitle, prefix, tagStack} = this.props.pageContext

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
        <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} tagStack={tagStack} />
        <BackTop />
        <Row gutter={16}>
          <Col
            xs={{span: 4, offset: 0}}
            sm={{span: 4, offset: 1}}
            md={{span: 4, offset: 2}}
            lg={{span: 4, offset: 3}}
            xl={{span: 4, offset: 4}}>
            <Anchor style={{backgroundColor: 'transparent'}}>
              {Object.keys(sortedNodes).map(key => {
                return <Link href={`#${key}`} key={`anchor-${key}`} title={key.toUpperCase()} />
              })}
            </Anchor>
          </Col>
          <Col xs={{span: 20}} sm={{span: 18}} md={{span: 16}} lg={{span: 14}} xl={{span: 12}}>
            {Object.keys(sortedNodes).map(key => {
              return (
                <Card id={key} style={{margin: '20px 5px', borderRadius: '10px'}} key={`col-${key}`}>
                  <Title level={3}>{key.toUpperCase()}</Title>
                  <List
                    bordered
                    dataSource={sortedNodes[key]}
                    renderItem={item => (
                      <List.Item>
                        <a href={`/${prefix}/${item.id}`} onClick={success}>
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
    tagStack: PropTypes.object,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
