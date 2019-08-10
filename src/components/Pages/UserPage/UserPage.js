import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userService } from './../../../services/UserService'
import { logoutUser } from './../../../reducers/user/userReducer'
import uuid from 'uuid'

const mapStateToProps = state => {
    return {
        userCurrentlyLoggedIn: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const UserPage = ({ match, logoutUser, userCurrentlyLoggedIn }) => {
    const [ user, setUser ] = useState(null)
    const [ redirect, setRedirect ] = useState(null)

    useEffect(() => {
        const fetchUser = async() => {
            const fetchedUser = await userService.fetchUserById(match.params.id)
            setUser(fetchedUser)
        }
        fetchUser()
    }, [match])

    const handleLogout = () => {
        // remove user from local storage
        userService.logout()
        // remove user from redux store
        logoutUser()
        //redirect to home page
        setRedirect(true)
    }

    if (redirect) {
        return <Redirect to="/login" />
    }

    else if (user) {
        return(
            <div>
                <h1>Blogs</h1>
                <p>{userCurrentlyLoggedIn.username} logged in.</p>
                <button onClick={handleLogout}>logout</button>
                <h1>{user.name}</h1>
                <h3>added blogs</h3>
                {user.blogs.map(blog => <li key={uuid()}>{blog.title}</li>)}
            </div>
        )
    } else {
        return(
            null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)