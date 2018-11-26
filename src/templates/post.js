import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.dataJson
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const fileext = post.nh_is_jpg === "0" ? ".png" : ".jpg";
    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={`${post.path} | ${siteTitle}`}
        />
        {
          Array.from({ length: post.nh_pages }, (_, i) => (
            <img src={"https://i.nhentai.net/galleries/" + post.nh_id + "/" + (i + 1) + fileext}></img>
          ))
        }
      </div>
    );
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    dataJson(path: { eq: $slug }) {
      path
      nh_id
      nh_pages
      nh_is_jpg
    }
  }
`
