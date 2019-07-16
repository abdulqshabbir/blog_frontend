import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import PropTypes from 'prop-types'

const FrontPage = ({ user, setUser }) => {
    const [ blogs, setBlogs ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
  
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios(`http://localhost:5000/api/blogs`)
            setBlogs(response.data)
            setIsLoading(false)
        }
        fetchBlogs()
    }, [])

    const handleUserLogout = (e) => {
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

export default FrontPage

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