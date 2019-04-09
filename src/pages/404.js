import React from 'react'

import {Row, Col, Card, Typography} from 'antd'

import {App} from '../components/app'

const {Title} = Typography

const NotFoundPage = () => (
  <App title={`Riffy H`} subtitle={`error`} htmlTitle={`Not Found · Riffy H`}>
    <Row style={{height: '100vh'}}>
      <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}} lg={{span: 8, offset: 8}}>
        <Card>
          <Title level={2}>Not found</Title>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Card>
      </Col>
    </Row>
  </App>
)

export default NotFoundPage
