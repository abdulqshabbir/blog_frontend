import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { userService } from './../../../services/UserService'
import { Redirect } from 'react-router-dom'
import { logoutUser } from './../../../reducers/user/userReducer'

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const UsersPage = ({ username, logoutUser }) => {
    const [ users, setUsers ] = useState([])
    const [ redirect, setRedirect ] = useState(false)
    useEffect(() => {
        const fetchUsers = async () => {
            const usersFetched = await userService.fetchAllUsers()
            setUsers(usersFetched)
        }
        fetchUsers()
    }, [])

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
    } else {
        return(
            <div>
                <h1>blogs</h1>
                <p>{username} is currently logged in</p>
                <button onClick={handleLogout}>logout</button>
                <h1>Users</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Number of Blogs</th>
                        </tr>
                        {users.map(user =>
                            <tr key={user.username}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)