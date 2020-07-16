import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"

import { Typography, Button } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    maxWidth: "70ch",
  },
  cardHeader: {
    marginTop: 0,
  },
}))

const PostPreview = ({ post }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.frontmatter.title}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          color="textSecondary"
          component="h3"
        >
          {post.frontmatter.date}
        </Typography>
        <Typography component="p" variant="body1">
          {post.excerpt}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={post.fields.slug} color="primary">
          Read Post
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostPreview
