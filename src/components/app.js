import React from 'react'
import PropTypes from 'prop-types'

import {Row, Col, Layout, Typography, Divider, Icon, Drawer, List} from 'antd'
import 'antd/dist/antd.css'

import appStyle from './app.module.css'

const {Footer, Content} = Layout
const {Title, Text} = Typography

export class App extends React.Component {
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
    const {title, subtitle, children} = this.props

    const menuStack = [
      {
        name: 'Home',
        url: '/listing',
      },
      {
        name: 'Tags',
        url: '/t',
      },
      {
        name: 'Character',
        url: '/c',
      },
      {
        name: 'Parody',
        url: '/p',
      },
      {
        name: 'Artist',
        url: '/a',
      },
      {
        name: 'Language',
        url: '/l',
      },
      {
        name: 'Group',
        url: '/g',
      },
    ]

    return (
      <Layout>
        <Content className={appStyle.container}>
          <Row className={appStyle.header} type="flex" justify="space-between" align="bottom">
            <Col span={22}>
              <Title className={appStyle.title}>{title}</Title>
              {subtitle && (
                <Title style={{display: 'inline'}} level={3} className={appStyle.subtitle}>{` ${subtitle}`}</Title>
              )}
            </Col>
            <Col span={2}>
              <Icon style={{fontSize: '24px', paddingBottom: '10px'}} type="more" onClick={this.showDrawer} />
              <Drawer
                title={
                  <Title level={2} style={{marginBottom: 0}}>
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
          </Row>
          <Divider className={appStyle.divider} />
          {children}
        </Content>
        <Footer className={appStyle.footer}>
          Built with love by <a href="https://facebook.com/rayriffy">r4yr1ffy</a>
        </Footer>
      </Layout>
    )
  }
}

App.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
