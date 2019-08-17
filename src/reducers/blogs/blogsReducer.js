import BlogService from '../../services/BlogServices'

//initial state
const initialState = []

// Actions
const SET_BLOGS = 'SET_BLOGS'
const CREATE_BLOG = 'CREATE_BLOG'
const DO_NOT_CREATE_BLOG = 'DO_NOT_CREATE_BLOG'
const INCREMENT_LIKES = 'INCREMENT_LIKES'

// Action Creators
export const setBlogs = (blogs) => {
    return {
        type: SET_BLOGS,
        blogs
    }
}

export const createBlog = ({ title, author, url }) => {
    return async dispatch => {
        const blog = await BlogService.createBlog({ title, author, url })

        if (!blog) {
            dispatch({ type: DO_NOT_CREATE_BLOG })
        }
        else {
            dispatch({ type: CREATE_BLOG, blog })
        }
    }
}

export const incrementLikes = (blogId, currentLikes) => {
    return async dispatch => {
        try {
            const updatedLikes = await BlogService.updateLikes(blogId, currentLikes)
            dispatch({
                type: INCREMENT_LIKES,
                updatedLikes,
                id: blogId
            })
        } catch (exception) {
            console.log(exception)
        }

    }
}

// blogs reducer
const blogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case INCREMENT_LIKES:
            return state.map(blog => {
                if (blog.id === action.id) {
                    blog.likes = action.updatedLikes
                    return blog
                } else {
                    return blog
                }
            })
        case CREATE_BLOG:
            return [
                ...state,
                action.blog //new blog object to be added
            ]
        case DO_NOT_CREATE_BLOG:
            return [
                ...state
            ]
        case SET_BLOGS:
            return action.blogs
        default:
            return state
    }
}

export default blogsReducer