import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostPreview from "../components/post-preview"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    maxWidth: "70ch",
  },
}))

const PostList = props => {
  const classes = useStyles()
  const { data } = props
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : currentPage - 1
  const nextPage = currentPage + 1
  const posts = data.allMdx.edges
  return (
    <Layout>
      {posts.map(post => (
        <PostPreview key={post.node.fields.slug} post={post.node} />
      ))}
      <div className={classes.buttonContainer}>
        <Button
          disabled={isFirst}
          component={Link}
          to={`/${prevPage}`}
          rel="prev"
        >
          <KeyboardArrowLeft /> Newer
        </Button>
        <Button
          disabled={isLast}
          component={Link}
          to={`/${nextPage}`}
          rel="next"
        >
          Older <KeyboardArrowRight />
        </Button>
      </div>
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
            date(formatString: "DD MMM YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default PostList
