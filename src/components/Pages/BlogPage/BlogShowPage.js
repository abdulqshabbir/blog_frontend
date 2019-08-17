import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from './../../../reducers/user/userReducer'
import BlogService from '../../../services/BlogServices'

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const BlogShowPage = ({ match, user, blogs, logoutUser }) => {
    const blogId = match.params.id
    const blog = blogs.find(blog => blog.id === blogId)
    const handleLikePress = (e) => {
        e.stopPropagation()
        BlogService.setToken(user.token)
        BlogService.updateLikes(blog.id, blog.likes)
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
            <p>{blog.likes} likes <button onClick={handleLikePress}>like</button></p>
            <p>added by {blog.author}</p>
            <h3>Comments: </h3>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogShowPage)