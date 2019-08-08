import React, { useEffect } from 'react'
import Login from './components/Login/Login'
import FrontPage from './components/Pages/FrontPage'
import Signup from './components/Signup/Signup'
import { loginUser } from './reducers/user/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UsersPage from './components/Pages/UsersPage'

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, token, id) => dispatch(loginUser(username, token, id))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const getUserFromLocalStorage = () => {
  const username = window.localStorage.getItem('username') || null
  const token = window.localStorage.getItem('token') || null
  const id = window.localStorage.getItem('id') || null

  if (username && token && id) {
    return { username, token, id }
  } else {
    return null
  }
}

const App = ({ user, loginUser }) => {
  useEffect(() => {
    const authenticatedUser = getUserFromLocalStorage()

    if (authenticatedUser !== null) {
      const { username, token, id } = authenticatedUser
      loginUser(username, token, id)
    }
  }, [loginUser])
  // check if user information is already stored in the browswer
  if (!user || user.username === null) {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    )
  }
  // user in redux store
  else {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/users" component={() => <UsersPage /> } />
            <Route path="/" render={() => <FrontPage user={user} /> } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)