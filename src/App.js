import React, { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import FrontPage from './components/Pages/FrontPage'
import Signup from './components/Signup/Signup'

const App = () => {
  const [ authenticatedUser, setAuthenticatedUser ] = useState(null)

  useEffect(() => {
    // check to see if user is aleady logged in
    if(window.localStorage.getItem('token')) {
      const username = window.localStorage.getItem('username')
      const token = window.localStorage.getItem('token')
      const id = window.localStorage.getItem('id')
      setAuthenticatedUser({
        username,
        token,
        id
      })
    }
  }, [])

  if (authenticatedUser === null) {
    return (
      <div>
        < Login
          setAuthenticatedUser={setAuthenticatedUser}
          authenticatedUser={authenticatedUser}
        />
        < Signup />
      </div>
    )
  }

  else {
    return (
      <div>
        < FrontPage
          user={authenticatedUser}
          setUser={setAuthenticatedUser}
        />
      </div>
    )
  }
}

export default App