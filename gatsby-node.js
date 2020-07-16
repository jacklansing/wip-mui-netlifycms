/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Create pages for our posts

exports.createPages = async ({ actions, graphql, reporter }) => {
  const results = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (results.errors) {
    reporter.panic("failed to create posts", results.errors)
  }

  const posts = results.data.allMdx.nodes

  posts.forEach(post => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve("./src/templates/post.js"),
      context: {
        slug: post.frontmatter.slug,
      },
    })
  })
}
