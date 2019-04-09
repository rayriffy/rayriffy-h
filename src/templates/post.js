import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Helmet from 'react-helmet'
import _ from 'lodash'

export default class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.dataJson
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw} = this.props.pageContext

    console.log(raw)

    const imgStyle = {
      width: '100%',
    }

    return (
      <div>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${raw.title.pretty} · ${siteTitle}`} />
        {_.each(raw.images.pages, (page, i) => {
          if (!post.exclude.includes(i + 1)) {
            return (
              <img
                style={imgStyle}
                src={`https://i.nhentai.net/galleries/${raw.media_id}/${i + 1}.${page.t === 'p' ? '.png' : '.jpg'}`}
              />
            )
          }
        })}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query PostBySlug($id: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    dataJson(nh_id: {eq: $id}) {
      exclude
    }
  }
`

PostTemplate.propTypes = {
  pageContext: PropTypes.shape({
    raw: PropTypes.object,
  }),
  data: PropTypes.shape({
    dataJson: PropTypes.object,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
