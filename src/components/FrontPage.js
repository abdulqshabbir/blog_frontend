import React from 'react'
import { useState, useEffect } from 'react'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import PropTypes from 'prop-types'
import useResource from './../hooks/useResource'
import { connect } from 'react-redux'

const FrontPage = ({ user, setUser }) => {
  const [ blogs, setBlogs ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
  const blogService = useResource('http://localhost:5000/api/blogs')

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setIsLoading(false)
    }
    fetchBlogs()
  }, [blogService])

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

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps, null)(FrontPage)

FrontPage.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

/*
    @user has shape: [Object]
    { blogs:
        [
            {
                title: String,
                author: String},
                url: String
            },
            {...},
            {...}
        ],
        username: String,
        name: String,
        id: String
    }
*/