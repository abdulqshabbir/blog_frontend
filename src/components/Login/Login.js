import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import _ from 'lodash'
import useField from '../../hooks/useField'

const Login = ({ setAuthenticatedUser, authenticatedUser }) => {
  // component state using the custom hook useField

  const username = useField('text') // username is an object with an interface: {type: ..., value: ..., onChange: ...}
  const password = useField('password')
  const [ user, setUser ] = useState({})

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setUser({
      username: username.value,
      password: password.value
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
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
                    Password:
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
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