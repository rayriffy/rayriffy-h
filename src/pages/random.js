import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {Link, graphql} from 'gatsby'
import Style from '../components/style.module.css'

import LazyLoad from 'react-lazyload'

class RandomPage extends React.Component {
  render() {
    const node = _.sample(this.props.data.allDataJson.edges).node
    const siteTitle = this.props.data.site.siteMetadata.title

    const except = node.ext_except !== '' ? node.ext_except.split(',').map(Number) : []

    const imgStyle = {
      width: '100%',
    }
    return (
      <div className={Style.container}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`Random · ${siteTitle}`} />

        <Link to={'/' + node.path} target="_blank" rel="noopener noreferrer">
          <LazyLoad>
            <img
              style={imgStyle}
              src={
                'https://i.nhentai.net/galleries/' +
                node.nh_id +
                '/1' +
                (node.nh_is_jpg === '0'
                  ? except.includes(1) === true
                    ? '.jpg'
                    : '.png'
                  : except.includes(1) === true
                  ? '.png'
                  : '.jpg')
              }
            />
          </LazyLoad>
        </Link>
      </div>
    )
  }
}

export default RandomPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allDataJson {
      edges {
        node {
          path
          nh_id
          nh_pages
          nh_is_jpg
          ext_except
          exclude
        }
      }
    }
  }
`

RandomPage.propTypes = {
  data: PropTypes.shape({
    allDataJson: PropTypes.shape({
      edges: PropTypes.array,
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
