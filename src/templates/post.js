import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"

import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography, Button } from "@material-ui/core"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date(formatString: "DD MMM YYYY")
      }
      body
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))

const PostTemplate = ({ data: { mdx: post }, ...props }) => {
  const classes = useStyles()
  let previousUri = "/"
  if (props.location.state) {
    previousUri = props.location.state.previousUri
  }

  return (
    <Layout>
      <Paper className={classes.root} elevation={24}>
        <Typography variant="h4" component="h1">
          {post.frontmatter.title}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Posted by {post.frontmatter.author} - {post.frontmatter.date}
        </Typography>
        <Typography variant="body1" component="div">
          <MDXRenderer>{post.body}</MDXRenderer>
        </Typography>
        <Button component={Link} to={`..${previousUri}`} color="primary">
          <KeyboardArrowLeft /> BACK
        </Button>
      </Paper>
    </Layout>
  )
}

export default PostTemplate
