import React from 'react'
import { useState, useEffect } from 'react'
import CreateBlog from '../../CreateBlogForm/CreateBlog'
import Blog from '../../Blog/Blog'
import useResource from './../../../hooks/useResource'
import { connect } from 'react-redux'
import { setBlogs } from '../../../reducers/blogs/blogsReducer'
import Notification from '../../Notification/Notification'
import { logoutUser } from '../../../reducers/user/userReducer'

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBlogs: blogs => dispatch(setBlogs(blogs)),
    logoutUser: () => dispatch(logoutUser())
  }
}

const FrontPage = ({ user, blogs, notification, setBlogs, history }) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const blogService = useResource('http://localhost:5000/api/blogs')

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setIsLoading(false)
    }
    fetchBlogs()
  }, [ setBlogs ])

  if (isLoading) {
    return <p>Please wait a moment</p>
  }

  else {
    return (
      <div>
        <h1>Welcome, to my Blog Application</h1>
        {notification.isVisible ? <Notification text={notification.text} /> : null}
        < CreateBlog user={user} history={history}/>
        {blogs
          .sort((blogA, blogB) => (blogB.likes - blogA.likes))
          .map(blog =>
            < Blog
              user={user}
              blog={blog}
              key={blog.id}
              id={blog.id}
            />
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)