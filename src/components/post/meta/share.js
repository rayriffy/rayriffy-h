import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import {Row, Col, Typography, Button, Icon, Modal, Skeleton} from 'antd'

import shareStyle from './share.module.css'

const {Text} = Typography

export class Share extends React.Component {
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
    const {id} = this.props

    return (
      <Row key="meta-buttons" className={shareStyle.container}>
        <Button
          type="primary"
          shape="circle"
          className={shareStyle.share}
          key="button-share"
          onClick={() => this.showModal(id)}>
          <Icon type="share-alt" />
        </Button>
        <Button shape="circle" key="button-export">
          <a href={`https://nhentai.net/g/${id}`} target="_blank" rel="noopener noreferrer">
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
                  <img className={shareStyle.image} src={hits} />
                </Col>
                <Col className={shareStyle.title} xs={{span: 16, offset: 4}}>
                  <Text strong>Share securely with Opener</Text>
                </Col>
              </Row>
              <Row className={shareStyle.buttonContainer} key={`modal-buttons`}>
                <Col xs={{span: 11, offset: 1}}>
                  <a href={hits} download>
                    <Button type="primary" className={shareStyle.button}>
                      <Icon type="download" /> Download
                    </Button>
                  </a>
                </Col>
                <Col xs={{span: 10, offset: 1}}>
                  <CopyToClipboard text={id} onCopy={() => this.setState({isCopied: true})}>
                    <Button className={shareStyle.button}>
                      <Icon type="copy" /> {isCopied ? `Copied!` : `Copy code`}
                    </Button>
                  </CopyToClipboard>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </Row>
    )
  }
}

Share.propTypes = {
  id: PropTypes.number,
}
