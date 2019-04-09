import React from 'react'
import PropTypes from 'prop-types'

import {Row, Layout, Typography, Divider} from 'antd'
import 'antd/dist/antd.css'

import appStyle from './app.module.css'

const {Footer, Content} = Layout
const {Title} = Typography

export class App extends React.Component {
  render() {
    const {title, subtitle, children} = this.props
    return (
      <Layout>
        <Content className={appStyle.container}>
          <Row>
            <Title className={appStyle.title}>{title}</Title>
            {subtitle && <Title style={{display: 'inline'}} level={3} className={appStyle.subtitle}>{` ${subtitle}`}</Title>}
            <Divider className={appStyle.divider} />
          </Row>
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
