import React from 'react'
import Login from './components/Login/Login'
import FrontPage from './components/Pages/FrontPage'
import Signup from './components/Signup/Signup'
import userIfUserAlreadyLoggedIn from './hooks/userIfUserAlreadyLoggedIn'
import { loginUser } from './reducers/user/userReducer'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, token, id) => dispatch(loginUser(username, token, id)),
  }
}

const App = () => {
  const user = userIfUserAlreadyLoggedIn()
  // if user not already logged in
  if (!(user.username && user.id && user.token)) {
    return (
      <div>
        < Login />
        < Signup />
      </div>
    )
  }

  else {
    // save user to the redux store
    loginUser(user.username, user.token, user.id)
    return (
      <div>
        < FrontPage
          user={user}
        />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(App)