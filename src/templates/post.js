import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import React from 'react'
export default class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.dataJson
    const siteTitle = this.props.data.site.siteMetadata.title
    const except = (post.ext_except !== "") ? post.ext_except.split(',').map(Number)  : []
    const exclude = (post.exclude !== "") ? post.exclude.split(',').map(Number)  : []

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={`${post.path} · ${siteTitle}`}
        />
        {
          Array.from({ length: post.nh_pages }, (_, i) => {
              if(exclude.includes(i + 1) !== true) {
                return (
                  <img src={"https://i.nhentai.net/galleries/" + post.nh_id + "/" + (i + 1) + ((post.nh_is_jpg === "0") ? ((except.includes(i + 1) === true) ? ".jpg" : ".png") : ((except.includes(i + 1) === true) ? ".png" : ".jpg"))} />
                )
              }
            }
          )
        }
      </div>
    );
  }
}

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
      ext_except
      exclude
    }
  }
`
