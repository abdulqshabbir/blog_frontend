import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from './../../../reducers/user/userReducer'
import axios from 'axios'
import BlogService from './../../../services/BlogServices'
import Blog from '../../Blog/Blog';
const BASE_URL = 'http://localhost:5000/api/blogs/'

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const BlogShowPage = ({ match, user, logoutUser }) => {
    const [ blog, setBlog ] = useState(null)
    const blogId = match.params.id
    useEffect(() => {
        const findBlogById = async (id) => {
            try {
                const response = await axios.get(`${BASE_URL}/${id}`)
                setBlog(response.data)
            } catch (e) {
                console.log(e)
            }
        } 
        findBlogById(blogId)
    }, [blogId])

    const handleClick = async (e) => {
        try {
            await BlogService.setToken(user.token)
            await BlogService.updateLikes(blog.id, blog.likes)
        } catch (exception) {
            console.log(exception)
        }
    }
    if (!blog) {
        return null
    }
    return (
        <div>
            <h1>Blogs </h1>
            <p>{user.username} logged in.</p>
            <button onClick={logoutUser}>logout</button>
            <h1>{blog.title}</h1>
            <a href={`${blog.url}`}>{blog.url}</a>
            <p>{blog.likes} likes <button onClick={handleClick}>like</button></p>
            <p>added by {blog.author}</p>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogShowPage)