import React from 'react'
import { useState } from 'react'
import { attemptToAuthenticateUser } from './../../reducers/user/userReducer'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    attemptToAuthenticateUser: (username, password) => dispatch(attemptToAuthenticateUser(username, password))
  }
}

const Login = ({ attemptToAuthenticateUser }) => {
  // component state is kept in sync using the custom hook "useField"
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    attemptToAuthenticateUser(username, password)
  }
  return(
    <div className="login form">
      <h3>Log in to Application</h3>
      <form onSubmit={handleLoginSubmit}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Login)