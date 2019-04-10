import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import {Row, Col, Typography, Tag, Button, Icon, Modal, Skeleton, Divider} from 'antd'

const {Title, Text} = Typography

export class Post extends React.Component {
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
    const {raw, post = {exclude: []}} = this.props

    const pages = raw.images.pages

    return (
      <div>
        <Row style={{maxHeight: '460px'}} key="row-meta">
          <Col
            xs={{span: 10, offset: 2}}
            sm={{span: 8, offset: 4}}
            md={{span: 6, offset: 6}}
            lg={{span: 4, offset: 8}}
            key="col-cover">
            <img
              alt="cover"
              style={{width: '100%', height: 'auto'}}
              src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${raw.images.cover.t === 'p' ? 'png' : 'jpg'}`}
            />
          </Col>
          <Col
            xs={{span: 9, offset: 1}}
            sm={{span: 7, offset: 1}}
            md={{span: 5, offset: 1}}
            lg={{span: 3, offset: 1}}
            key="col-meta">
            <Row key="meta-title">
              <Title level={3}>{raw.title.pretty}</Title>
            </Row>
            <Row key="meta-tag">
              <Text strong style={{marginRight: 8, display: 'inline'}}>
                Tag
              </Text>
              {raw.tags.map(tag => {
                if (tag.type === 'tag') {
                  return (
                    <a href={`/t/${tag.id}`}>
                      <Tag color="blue" key={`tag-${raw.id}-${tag.id}`}>
                        {tag.name}
                      </Tag>
                    </a>
                  )
                }
              })}
            </Row>
            <Row key="meta-buttons">
              <Button
                type="primary"
                shape="circle"
                style={{marginTop: '20px', marginRight: '10px'}}
                key="button-share"
                onClick={() => this.showModal(raw.id)}>
                <Icon type="share-alt" />
              </Button>
              <Button shape="circle" style={{marginTop: '20px'}} key="button-export">
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
                    <Row>
                      <Col xs={{span: 12, offset: 6}}>
                        <img style={{borderRadius: '10px', width: '100%'}} src={hits} />
                      </Col>
                      <Col style={{marginTop: '10px', textAlign: 'center'}} xs={{span: 16, offset: 4}}>
                        <Text strong>Share securely with Opener</Text>
                      </Col>
                    </Row>
                    <Row style={{marginTop: '25px'}}>
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
        <Divider>
          <Icon type="book" theme="outlined" />
        </Divider>
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
                    style={{width: '100%'}}
                    src={`https://i.nhentai.net/galleries/${raw.media_id}/${i + 1}.${page.t === 'p' ? 'png' : 'jpg'}`}
                  />
                </Col>
              )
            }
          })}
        </Row>
      </div>
    )
  }
}

Post.propTypes = {
  raw: PropTypes.object,
  post: PropTypes.object,
}
