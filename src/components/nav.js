import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import {AppContextConsumer} from '../context/AppContext'

import {Col, Icon, Drawer, List, Typography, Switch} from 'antd'

import {themes} from '../themes.js'
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
    const {toggle} = this.props

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
              {({color, blur}) => {
                return (
                  <Col span={2}>
                    <Icon
                      className={[navStyle.icon, color in themes ? themes[color].style.whiteText : null].join(' ')}
                      type="more"
                      onClick={this.showDrawer}
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
                          checked={color === 'dark'}
                          onChange={() => toggle('dark')}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />{' '}
                        <Text strong>Dark Mode</Text>
                      </div>
                      <div style={{marginTop: '10px'}}>
                        <Switch
                          checked={blur}
                          onChange={() => toggle('blur')}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />{' '}
                        <Text strong>Safe Mode</Text>
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
  toggle: PropTypes.func,
}
