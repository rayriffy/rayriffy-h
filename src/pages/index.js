import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'
import Style from '../components/style.module.css'
import Grid from '@material-ui/core/Grid';

class PostTemplate extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    return (
      <div className={Style.container}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={`${siteTitle}`}
        />
        <Grid container spacing={24}>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const fileext = node.frontmatter.nh_is_jpg === 0 ? ".png" : ".jpg";
          return (
            <Grid item xs={12} sm={6} md={4} alignItems='center'>
              <a href={node.fields.slug} target="_blank">
                <img src={"https://i.nhentai.net/galleries/" + node.frontmatter.nh_id + "/1" + fileext} /><br />{title}
              </a>
            </Grid>
          )
        })}
        </Grid>
      </div>
    );
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            nh_id
            nh_pages
            nh_is_jpg
          }
        }
      }
    }
  }
`
