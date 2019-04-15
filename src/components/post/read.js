import React from 'react'
import PropTypes from 'prop-types'

import {AppContextConsumer} from '../../context/AppContext'

import {Row, Col} from 'antd'

import readStyle from './read.module.css'

export class Read extends React.Component {
  render() {
    const {raw, post} = this.props

    const pages = raw.images.pages

    return (
      <AppContextConsumer>
        {({blur}) => {
          return (
            <Row key="row-images">
              {pages.map((page, i) => {
                if (!post.exclude.includes(i + 1)) {
                  return (
                    <Col
                      xs={{span: 24, offset: 0}}
                      sm={{span: 22, offset: 1}}
                      md={{span: 20, offset: 2}}
                      lg={{span: 16, offset: 4}}
                      xl={{span: 12, offset: 6}}
                      key={`image-${raw.id}-${i + 1}`}>
                      <img
                        className={readStyle.image}
                        style={{filter: blur ? 'blur(15px)' : null}}
                        src={`https://i.nhentai.net/galleries/${raw.media_id}/${i + 1}.${page.t === 'p' ? 'png' : 'jpg'}`}
                      />
                    </Col>
                  )
                }
              })}
            </Row>
          )
        }}
      </AppContextConsumer>
    )
  }
}

Read.propTypes = {
  raw: PropTypes.object,
  post: PropTypes.object,
}
