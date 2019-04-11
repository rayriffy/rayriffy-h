import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import {Row, Col, Typography, Button, Icon, Modal, Skeleton} from 'antd'

import {Slug} from './meta/slug'

import metaStyle from './meta.module.css'

const {Title, Text} = Typography

export class Meta extends React.Component {
  state = {visible: false, isLoading: true, hits: null, error: false, isCopied: false}

  showModal = async id => {
    this.setState({
      visible: true,
      isLoading: true,
    })

    try {
      const out = await axios.get(`https://opener.now.sh/api/generate/${id}`)
      this.setState({hits: out.data.dataURL, isLoading: false})
    } catch (err) {
      console.log(err)
      this.setState({error: true, isLoading: false})
    }
  }

  handleOk = e => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const {visible, isLoading, error, hits, isCopied} = this.state
    const {raw, tagStack} = this.props

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
        <Col
          xs={{span: 12, offset: 1}}
          sm={{span: 11, offset: 1}}
          md={{span: 10, offset: 1}}
          lg={{span: 9, offset: 1}}
          key="col-meta">
          <Row key="meta-title">
            <Title level={3}>{raw.title.pretty}</Title>
          </Row>
          <Row key="meta-tag">
            <Slug id={raw.id} tags={raw.tags} tagStack={tagStack} />
          </Row>
          <Row key="meta-buttons" className={metaStyle.button}>
            <Button
              type="primary"
              shape="circle"
              className={metaStyle.share}
              key="button-share"
              onClick={() => this.showModal(raw.id)}>
              <Icon type="share-alt" />
            </Button>
            <Button shape="circle" key="button-export">
              <a href={`https://nhentai.net/g/${raw.id}`} target="_blank" rel="noopener noreferrer">
                <Icon type="export" />
              </a>
            </Button>
            <Modal
              title="Share"
              visible={visible}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Close
                </Button>,
              ]}>
              {isLoading ? (
                <Skeleton active />
              ) : error ? (
                <div>Connot retrive data from API :(</div>
              ) : (
                <div>
                  <Row key={`modal-image`}>
                    <Col xs={{span: 12, offset: 6}}>
                      <img style={{borderRadius: '10px', width: '100%'}} src={hits} />
                    </Col>
                    <Col style={{marginTop: '10px', textAlign: 'center'}} xs={{span: 16, offset: 4}}>
                      <Text strong>Share securely with Opener</Text>
                    </Col>
                  </Row>
                  <Row style={{marginTop: '25px'}} key={`modal-buttons`}>
                    <Col xs={{span: 11, offset: 1}}>
                      <a href={hits} download>
                        <Button type="primary" style={{width: '100%'}}>
                          <Icon type="download" /> Download
                        </Button>
                      </a>
                    </Col>
                    <Col xs={{span: 10, offset: 1}}>
                      <CopyToClipboard text={raw.id} onCopy={() => this.setState({isCopied: true})}>
                        <Button style={{width: '100%'}}>
                          <Icon type="copy" /> {isCopied ? `Copied!` : `Copy code`}
                        </Button>
                      </CopyToClipboard>
                    </Col>
                  </Row>
                </div>
              )}
            </Modal>
          </Row>
        </Col>
      </Row>
    )
  }
}

Meta.propTypes = {
  raw: PropTypes.object,
  tagStack: PropTypes.object,
}
