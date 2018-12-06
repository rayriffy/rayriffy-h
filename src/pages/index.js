import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import Style from '../components/style.module.css'
import Grid from '@material-ui/core/Grid';

class PostTemplate extends React.Component {
  render() {
    const posts = this.props.data.allDataJson.edges
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <div className={Style.container}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={`${siteTitle}`}
        />
        <Grid container spacing={24}>
        {posts.map(({ node }) => {
          const title = node.path
          const except = (node.ext_except !== "") ? node.ext_except.split(',').map(Number)  : []
          return (
            <Grid item xs={12} sm={6} md={4} alignItems='center'>
              <a href={node.path} target="_blank">
                <img src={"https://i.nhentai.net/galleries/" + node.nh_id + "/1" + ((node.nh_is_jpg === "0") ? ((except.includes(1) === true) ? ".jpg" : ".png") : ((except.includes(1) === true) ? ".png" : ".jpg"))} /><br />{title}
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
