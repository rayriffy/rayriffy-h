import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import LocalStorage from 'local-storage'

import {AppContextProvider} from '../context/AppContext'

import {Row, Col, Layout, Typography, Divider} from 'antd'

import {Nav} from './nav'

import appStyle from './app.module.css'

const {Footer, Content} = Layout
const {Title, Text} = Typography

export class App extends React.Component {
  state = {dark: LocalStorage.get('dark')}

  toggleDark = () => {
    let newState = !LocalStorage('dark')
    LocalStorage.set('dark', newState)
    this.setState({dark: newState})
  }

  componentDidMount = () => {
    if (LocalStorage('dark') === null) {
      LocalStorage.set('dark', false)
      this.setState({dark: false})
    }
  }

  render() {
    const {dark} = this.state
    const {title, subtitle, children, navigation = true} = this.props

    return (
      <AppContextProvider value={{dark: dark}}>
        <Helmet>
          <style>
            {`body {
              background-color: ${dark ? '#272728' : '#f0f2f5'}
            }`}
          </style>
        </Helmet>
        <Layout style={{backgroundColor: dark ? '#272728' : '#f0f2f5'}}>
          <Content className={appStyle.container}>
            <Row className={appStyle.header} type="flex" justify="space-between" align="bottom">
              <Col span={navigation ? 22 : 24}>
                <Title style={{color: dark ? '#e1e1e1' : 'rgba(0, 0, 0, 0.85)'}} className={appStyle.title}>
                  {title}
                </Title>
                {subtitle && (
                  <Title
                    level={3}
                    style={{color: dark ? '#a7a7a8' : 'rgba(0, 0, 0, 0.45)', display: 'inline'}}>{` ${subtitle}`}</Title>
                )}
              </Col>
              {navigation && <Nav toggleDark={this.toggleDark} />}
            </Row>
            <Divider className={appStyle.divider} />
            {children}
          </Content>
          <Footer className={appStyle.footer}>
            <Text style={{color: dark ? '#fff' : 'rgba(0, 0, 0, 0.65)'}}>Built with love by</Text>{' '}
            <a href="https://facebook.com/rayriffy" style={{color: dark ? '#3784f7' : '#1890ff'}}>
              r4yr1ffy
            </a>
          </Footer>
        </Layout>
      </AppContextProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  navigation: PropTypes.bool,
  dark: PropTypes.bool,
  toggledark: PropTypes.func,
}
