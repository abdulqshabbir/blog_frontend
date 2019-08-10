import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from './../../../reducers/user/userReducer'

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const BlogsPage = ({ user, logoutUser }) => {
    return (
        <div>
            <h1>blogs</h1>
            <p>{user.username} currently logged in.</p>
            <button onClick={logoutUser}>logout</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage)