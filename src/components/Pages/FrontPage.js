import React from 'react'
import { useState, useEffect } from 'react'
import CreateBlog from '../CreateBlogForm/CreateBlog'
import Blog from '../Blog/Blog'
import PropTypes from 'prop-types'
import useResource from '../../hooks/useResource'
import { connect } from 'react-redux'
import { setBlogs } from '../../reducers/blogs/blogsReducer'
import Notification from '../Notification/Notification'

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBlogs: blogs => dispatch(setBlogs(blogs)),
  }
}

const FrontPage = ({ user, setUser, blogs, notification, setBlogs }) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const blogService = useResource('http://localhost:5000/api/blogs')

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setIsLoading(false)
    }
    fetchBlogs()
  }, [setBlogs])

  const handleUserLogout = () => {
    const storage = window.localStorage
    // clear user data from browswer
    storage.clear()
    // clear user data from react and trigger re-render
    setUser(null)
  }

  if (isLoading) {
    return <p>Please wait a moment</p>
  }

  else {
    return (
      <div>
        <h1>Welcome, to my Blog Application</h1>
        <h3>{user.username} just logged in.</h3>
        <button onClick={handleUserLogout}>Log out</button>
        {notification.isVisible ? <Notification text={notification.text} /> : null}
        < CreateBlog user={user} />
        {blogs
          .sort((blogA, blogB) => (blogB.likes - blogA.likes))
          .map(blog =>
            < Blog
              user={user}
              blog={blog}
              key={blog.id}
            />
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)

FrontPage.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}