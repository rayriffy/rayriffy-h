import React from 'react'
import PropTypes from 'prop-types'

import {AppContextConsumer} from '../../context/AppContext'

import {Row, Col, Typography} from 'antd'

import {Slug} from './meta/slug'
import {Share} from './meta/share'

import metaStyle from './meta.module.css'

const {Title} = Typography

export class Meta extends React.Component {
  render() {
    const {raw} = this.props

    return (
      <Row className={metaStyle.container} key="row-meta">
        <Col
          xs={{span: 10, offset: 0}}
          sm={{span: 8, offset: 2}}
          md={{span: 6, offset: 4}}
          lg={{span: 4, offset: 6}}
          key="col-cover">
          <img
            alt="cover"
            className={metaStyle.image}
            src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${raw.images.cover.t === 'p' ? 'png' : 'jpg'}`}
          />
        </Col>
        <AppContextConsumer>
          {({dark}) => {
            return (
              <Col
                xs={{span: 12, offset: 1}}
                sm={{span: 11, offset: 1}}
                md={{span: 10, offset: 1}}
                lg={{span: 9, offset: 1}}
                key="col-meta">
                <Row key="meta-title">
                  <Title level={3} style={{color: dark ? '#e1e1e1' : 'rgba(0, 0, 0, 0.85)'}}>
                    {raw.title.pretty}
                  </Title>
                </Row>
                <Row key="meta-tag">
                  <Slug id={raw.id} tags={raw.tags} />
                </Row>
                <Share id={raw.id} key="meta-share" />
              </Col>
            )
          }}
        </AppContextConsumer>
      </Row>
    )
  }
}

Meta.propTypes = {
  raw: PropTypes.object,
}
