import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import {AppContextConsumer} from '../context/AppContext'

import {Col, Icon, Drawer, List, Typography, Switch} from 'antd'

import navStyle from './nav.module.css'

const {Title, Text} = Typography

export class Nav extends React.Component {
  state = {visible: false}

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const {toggleDark} = this.props

    return (
      <StaticQuery
        query={graphql`
          query NavQuery {
            allTagJson {
              edges {
                node {
                  prefix
                  name
                }
              }
            }
          }
        `}
        render={data => {
          const menuStack = [
            {
              name: 'Home',
              url: '/listing',
            },
            {
              name: 'Custom',
              url: '/custom',
            },
          ]

          _.each(data.allTagJson.edges, edge => {
            menuStack.push({
              name: _.capitalize(edge.node.name),
              url: `/${edge.node.prefix}`,
            })
          })
          return (
            <AppContextConsumer>
              {({dark}) => {
                return (
                  <Col span={2}>
                    <Icon
                      className={navStyle.icon}
                      type="more"
                      onClick={this.showDrawer}
                      style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}
                    />
                    <Drawer
                      title={
                        <Title level={2} className={navStyle.title}>
                          Menu
                        </Title>
                      }
                      placement="left"
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible}>
                      <List
                        dataSource={menuStack}
                        renderItem={item => (
                          <List.Item>
                            <a href={item.url}>
                              <Text>{item.name}</Text>
                            </a>
                          </List.Item>
                        )}
                      />
                      <div style={{marginTop: '20px'}}>
                        <Switch
                          checked={dark}
                          onChange={() => toggleDark()}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />{' '}
                        <Text strong>Dark Mode</Text>
                      </div>
                    </Drawer>
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

Nav.propTypes = {
  toggleDark: PropTypes.func,
}
