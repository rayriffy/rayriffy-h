import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Style from '../components/style.module.css'
import Grid from '@material-ui/core/Grid'

import LazyLoad from 'react-lazyload'

class MainPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title

    const {raw} = this.props.pageContext

    return (
      <div className={Style.container}>
        <Helmet htmlAttributes={{lang: 'en'}} title={`${siteTitle}`} />

        <Grid container spacing={24} alignItems="center">
          {_.each(raw, async node => {
            if (node.status === 'success') {
              return (
                <Grid item xs={12} sm={6} md={4} key="grid">
                  <a href={`/c/${node.data.id}`} target="_blank" rel="noopener noreferrer">
                    <LazyLoad>
                      <img
                        src={`https://i.nhentai.net/galleries/${node.data.raw.media_id}/cover.${
                          node.data.raw.images.cover.t === 'p' ? '.png' : '.jpg'
                        }`}
                      />
                    </LazyLoad>
                    <br />
                    {node.data.raw.title.pretty}
                  </a>
                </Grid>
              )
            }
          })}
        </Grid>
      </div>
    )
  }
}

export default MainPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

MainPage.propTypes = {
  pageContext: PropTypes.shape({
    raw: PropTypes.object,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
