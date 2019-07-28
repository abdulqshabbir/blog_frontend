import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Login = ({ setAuthenticatedUser, authenticatedUser }) => {
  // component state
  const [ user, setUser ] = useState({})
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

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
    const handleUserLogin = async () => {
      if (!_.isEmpty(user)) {
        try {
          const response = await axios.post('http://localhost:5000/api/login', user)
          if (response.statusText === 'OK') {
            const user = {
              username: response.data.userForToken.username,
              id: response.data.userForToken.id,
              token: response.data.token
            }
            // save authentication data at application-level
            setAuthenticatedUser(user)
            // save authentication data in client browser
            saveUserInLocalStorage(user)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    handleUserLogin()
  }, [user, setAuthenticatedUser, authenticatedUser])
  return(
    <div className="login form">
      <h3>Log in to Application</h3>
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
  setAuthenticatedUser: PropTypes.func,
  authenticatedUser: PropTypes.object
}