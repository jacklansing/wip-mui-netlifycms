import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import usePosts from "../hooks/use-posts"
import PostPreview from "../components/post-preview"

const IndexPage = () => {
  const posts = usePosts()
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Home</h1>
      <h2>Posts</h2>
      {posts.map(post => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Layout>
  )
}

export default IndexPage
