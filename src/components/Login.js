import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const Login = ({ setAuthenticatedUser, authenticatedUser }) => {
    // component state
    const [ user, setUser ] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // controlled components: username and password
    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        setUser({
            username,
            password
        })
    }

    const saveUserInLocalStorage = (user) => {
        const storage = window.localStorage
        storage.setItem('username', user.username)
        storage.setItem('token', user.token)
        storage.setItem('id', user.id)
    }

    useEffect(() => {
        const handleUserLogin = () => {
                axios
                .post(`http://localhost:5000/api/login`, user)
                .then(response => {
                    const user = {
                        username: response.data.userForToken.username,
                        id: response.data.userForToken.id,
                        token: response.data.token
                    }
                    // save authentication data at application-level
                    setAuthenticatedUser(user)

                    // save authentication data in client browser
                    saveUserInLocalStorage(user)
                })
                .catch(error => console.log(error))
            }
        handleUserLogin()
    }, [user, setAuthenticatedUser, authenticatedUser])

    return(
        <div>
            <h1>Log in to Application</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    Username: 
                    <input 
                        type="text" 
                        value={username} 
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    Password: 
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login

Login.propTypes = {
    setAuthenticatedUser: PropTypes.func.isRequired,
    authenticatedUser: PropTypes.bool.isRequired
}