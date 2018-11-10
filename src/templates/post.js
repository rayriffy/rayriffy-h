import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const fileext = post.frontmatter.nh_is_jpg === 0 ? ".png" : ".jpg";
    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        {
          Array.from({ length: post.frontmatter.nh_pages }, (_, i) => (
            <img src={"https://i.nhentai.net/galleries/" + post.frontmatter.nh_id + "/" + (i + 1) + fileext}></img>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        nh_id
        nh_is_jpg
        nh_pages
      }
    }
  }
`
