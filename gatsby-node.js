/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* NetlifyCMS doesn't allow us to easily have a slug available on the frontmatter.
For that reason, we add slug as a field on the node here. */
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      node: node,
      name: `slug`,
      value,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const results = await graphql(`
    query {
      allMdx {
        nodes {
          fields {
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
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: require.resolve("./src/templates/post-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create pages for our posts
  posts.forEach(post => {
    actions.createPage({
      path: post.fields.slug,
      component: require.resolve("./src/templates/post.js"),
      context: {
        // In the post template's graphql query, you can use slug
        // as a GraphQL variable to query for data from the md file.
        slug: post.fields.slug,
      },
    })
  })
}
