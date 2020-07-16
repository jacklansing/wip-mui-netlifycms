import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostPreview from "../components/post-preview"

const PostList = props => {
  const { data } = props
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const posts = data.allMdx.edges
  return (
    <Layout>
      {posts.map(post => (
        <PostPreview key={post.node.fields.slug} post={post.node} />
      ))}
      <ul>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            &larr; Newer
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li key={`pagination-number${i + 1}`}>
            <Link to={`/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
          </li>
        ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Older &rarr;
          </Link>
        )}
      </ul>
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
