const initialState = []
const SET_BLOGS = 'SET_BLOGS'

// Action Creators
export const setBlogs = (blogs) => {
    return {
        type: SET_BLOGS,
        blogs
    }
}

// Reducer
const blogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BLOGS:
            return action.blogs
        default: 
            return state
    }
}

export default blogsReducer