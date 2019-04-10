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

    const {raw, subtitle, prefix} = this.props.pageContext

    const alphabet = `abcdefghijklmnopqrstuvwxyz`.split('')
    const nodes = _.sortBy(raw, node => node.name)

    const sortedNodes = {}
    _.each(alphabet, letter => {
      sortedNodes[letter] = []
    })
    _.each(nodes, node => {
      sortedNodes[node.name.charAt(0).toLowerCase()].push(node)
    })

    const success = () => {
      const hide = message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    }

    return (
      <App title={siteTitle} subtitle={subtitle}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />
        <BackTop />
        <Row gutter={16}>
          <Col
            xs={{span: 4, offset: 0}}
            sm={{span: 4, offset: 1}}
            md={{span: 4, offset: 2}}
            lg={{span: 4, offset: 3}}
            xl={{span: 4, offset: 4}}>
            <Anchor affix={false} style={{backgroundColor: 'transparent'}}>
              {alphabet.map(letter => {
                if (sortedNodes[letter].length !== 0) {
                  return <Link href={`#${letter}`} key={`anchor-${letter}`} title={letter.toUpperCase()} />
                }
              })}
            </Anchor>
          </Col>
          <Col xs={{span: 20}} sm={{span: 18}} md={{span: 16}} lg={{span: 14}} xl={{span: 12}}>
            {alphabet.map(letter => {
              if (sortedNodes[letter].length !== 0) {
                return (
                  <Card id={letter} style={{margin: '20px 5px', borderRadius: '10px'}} key={`col-${letter}`}>
                    <Title level={3}>{letter.toUpperCase()}</Title>
                    <List
                      bordered
                      dataSource={sortedNodes[letter]}
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
              }
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
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
