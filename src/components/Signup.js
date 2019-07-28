import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName ] = useState('')

  const clearInputFields = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setName('')
  }

  const handleUserCreation = (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const name = e.target.elements.name.value

    clearInputFields()

    axios.post('http://localhost:5000/api/users', { username, password, email, name })
  }
  return (
    <div>
      <h3>New user? Sign up using this form. </h3>
      <form className="signup form" onSubmit={handleUserCreation}>
        <div>
          Username:
          < input
            type="text"
            name="username"
            placeholder="new username here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password:
          < input
            type="password"
            name="password"
            placeholder="new password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          Email:
          < input
            type="text"
            name="email"
            placeholder="new email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          Name:
          < input
            type="text"
            name="name"
            placeholder="What do we call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <input type="submit" value="create user"/>
      </form>
    </div>
  )
}

export default Signup