import React from 'react'
import PropTypes from 'prop-types'

import {Row, Col, Layout, Typography, Divider} from 'antd'
import 'antd/dist/antd.css'

import {Nav} from './nav'

import appStyle from './app.module.css'

const {Footer, Content} = Layout
const {Title} = Typography

export class App extends React.Component {
  render() {
    const {title, subtitle, children, navigation = true} = this.props

    return (
      <Layout>
        <Content className={appStyle.container}>
          <Row className={appStyle.header} type="flex" justify="space-between" align="bottom">
            <Col span={navigation ? 22 : 24}>
              <Title className={appStyle.title}>{title}</Title>
              {subtitle && <Title level={3} className={appStyle.subtitle}>{` ${subtitle}`}</Title>}
            </Col>
            {navigation && <Nav />}
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
  navigation: PropTypes.bool,
}
