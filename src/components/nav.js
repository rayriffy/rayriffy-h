import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import {Col, Icon, Drawer, List, Typography} from 'antd'

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
    const {tagStack} = this.props

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

    _.each(Object.keys(tagStack), key => {
      menuStack.push({
        name: _.capitalize(tagStack[key].name),
        url: `/${tagStack[key].prefix}`,
      })
    })

    return (
      <Col span={2}>
        <Icon className={navStyle.icon} type="more" onClick={this.showDrawer} />
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
        </Drawer>
      </Col>
    )
  }
}

Nav.propTypes = {
  tagStack: PropTypes.object,
}
