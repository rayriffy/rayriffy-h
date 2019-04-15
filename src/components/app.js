import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import LocalStorage from 'local-storage'

import {AppContextProvider} from '../context/AppContext'

import {Row, Col, Layout, Typography, Divider} from 'antd'

import {Nav} from './nav'

import appStyle from './app.module.css'
import darkStyle from '../styles/dark.module.css'

const {Footer, Content} = Layout
const {Title, Text} = Typography

export class App extends React.Component {
  state = {mounted: false, dark: LocalStorage.get('dark')}

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

    this.setState({mounted: true})
  }

  render() {
    const {mounted, dark} = this.state
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
        {mounted && (
          <Layout style={{backgroundColor: dark ? '#272728' : '#f0f2f5'}}>
            <Content className={appStyle.container}>
              <Row className={appStyle.header} type="flex" justify="space-between" align="bottom">
                <Col span={navigation ? 22 : 24}>
                  <Title className={[appStyle.title, dark ? darkStyle.appTitle : null].join(' ')}>{title}</Title>
                  {subtitle && (
                    <Title
                      level={3}
                      className={dark ? darkStyle.appSubtitle : null}
                      style={{display: 'inline'}}>{` ${subtitle}`}</Title>
                  )}
                </Col>
                {navigation && <Nav toggleDark={this.toggleDark} />}
              </Row>
              <Divider className={appStyle.divider} />
              {children}
            </Content>
            <Footer className={appStyle.footer}>
              <Text className={dark ? darkStyle.whiteText : null}>Built with love by</Text>{' '}
              <a href="https://facebook.com/rayriffy" className={dark ? darkStyle.link : null}>
                r4yr1ffy
              </a>
            </Footer>
          </Layout>
        )}
        \
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
