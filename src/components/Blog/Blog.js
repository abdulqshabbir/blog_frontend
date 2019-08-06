import React, { useState } from 'react'
import './blog.css'
import BlogServices from '../../services/BlogServices'
import PropTypes from 'prop-types'

const Blog = ({ user, blog }) => {
  const [ isFullBlogVisible, setIsFullBlogVisible ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)

  const handleLikePress = (e) => {
    e.stopPropagation()
    setLikes(likes + 1)
    BlogServices.setToken(user.token)
    BlogServices.updateLikes(blog.id, likes)
  }

  const handleBlogDeletion = (e) => {
    e.stopPropagation()
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      BlogServices.setToken(user.token)
      BlogServices.deleteBlog(blog.id)
    }
  }

  if(!isFullBlogVisible) {
    return(
      <div className="blog" data-testid="full-blog-hidden" onClick={() => setIsFullBlogVisible(true)}>
        <p>{blog.title} written by {blog.author}</p>
      </div>
    )
  }

  else {
    return (
      <div key={blog.id} className="blog" data-testid="full-blog-shown" onClick={() => setIsFullBlogVisible(false)}>
        <h3>{blog.title} </h3>
        <p>Created by {blog.author}</p>
        <p>Link to full blog article: {blog.url}</p>
        <p>Number of likes: {likes} <button onClick={handleLikePress}>like</button></p>
        <button onClick={handleBlogDeletion}>Delete Blog</button>
      </div>
    )
  }
}

export default Blog

Blog.propTypes = {
  user: PropTypes.object.isRequired || null,
  blog: PropTypes.object.isRequired
}