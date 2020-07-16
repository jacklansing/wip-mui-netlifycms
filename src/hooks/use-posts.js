import { graphql, useStaticQuery } from "gatsby"

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
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
  `)

  return data.allMdx.nodes.map(post => ({
    title: post.frontmatter.title,
    author: post.frontmatter.author,
    date: post.frontmatter.date,
    slug: post.fields.slug,
    excerpt: post.excerpt,
  }))
}

export default usePosts
