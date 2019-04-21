import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import LocalStorage from 'local-storage'

import {AppContextProvider} from '../context/AppContext'

import {Row, Col, Layout, Typography, Divider} from 'antd'

import {Nav} from './nav'

import appStyle from './app.module.css'

import {themes} from '../themes.js'
const {Footer, Content} = Layout
const {Title, Text} = Typography

export class App extends React.Component {
  state = {
    mounted: false,
    color: LocalStorage.get('color') && LocalStorage.get('color').color,
    blur: LocalStorage.get('blur'),
  }

  toggle = id => {
    let newState = !LocalStorage(id)
    LocalStorage.set(id, newState)
    if (id === 'dark') {
      if (!LocalStorage('dark')) {
        this.setState({color: 'dark'})
        LocalStorage.set('color', {color: 'dark'})
      } else {
        this.setState({color: null})
        LocalStorage.set('color', {color: null})
      }
    } else if (id === 'blur') this.setState({blur: newState})
  }

  componentDidMount = () => {
    if (LocalStorage('color') === null) {
      LocalStorage.set('color', {color: null})
      this.setState({color: null})
    }

    if (LocalStorage('blur') === null) {
      LocalStorage.set('blur', true)
      this.setState({blur: true})
    }

    this.setState({mounted: true})
  }

  render() {
    const {mounted, color, blur} = this.state
    const {title, subtitle, children, navigation = true} = this.props

    return (
      <AppContextProvider value={{color, blur}}>
        <Helmet>
          <style>
            {`body {
              background-color: ${color in themes ? themes[color].bg : '#f0f2f5'}
            }`}
          </style>
        </Helmet>
        {mounted && (
          <Layout style={{backgroundColor: color in themes ? themes[color].bg : '#f0f2f5'}}>
            <Content className={appStyle.container}>
              <Row className={appStyle.header} type="flex" justify="space-between" align="bottom">
                <Col span={navigation ? 22 : 24}>
                  <Title className={[appStyle.title, color in themes ? themes[color].style.appTitle : null].join(' ')}>
                    {title}
                  </Title>
                  {subtitle && (
                    <Title
                      level={3}
                      className={color in themes ? themes[color].style.appSubtitle : appStyle.subtitle}
                      style={{display: 'inline'}}>{` ${subtitle}`}</Title>
                  )}
                </Col>
                {navigation && <Nav toggle={this.toggle} />}
              </Row>
              <Divider className={appStyle.divider} />
              {children}
            </Content>
            <Footer className={appStyle.footer}>
              <Text className={color in themes ? themes[color].style.whiteText : null}>Built with love by</Text>{' '}
              <a href="https://facebook.com/rayriffy" className={color in themes ? themes[color].style.link : null}>
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
  color: PropTypes.string,
  toggledark: PropTypes.func,
}
