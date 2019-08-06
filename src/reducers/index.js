import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import blogsReducer from './blogs/blogsReducer'
import notificationReducer from './notification/notificationReducer'

const rootReducer = combineReducers({
    user: userReducer,
    blogs: blogsReducer,
    notification: notificationReducer
})

export default rootReducer