import React from 'react'
import Helmet from 'react-helmet'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LazyLoad from 'react-lazyload'

class MainPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <div style={{backgroundColor: '#D1321C'}}>
        <Helmet
        htmlAttributes={{ lang: 'en' }}
        title={`${siteTitle}`}
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{height: '100vh'}}
        >
          <Grid item xs={10} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  WARNING!
                </Typography>
                <Typography variant="h5" component="h2">
                  Are you legally classified as an adult?
                </Typography>
                <Typography component="p">
                You must be classified as an adult and legally allowed to view the contents of this site in the country you are currently located.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="//blog.rayriffy.com">Exit</Button>
                <Button size="small" href="/main">Yes, I can legally enter.</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MainPage

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`