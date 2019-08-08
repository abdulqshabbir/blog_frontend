const getUserIfUserAlreadyLoggedIn = () => {
  const user = { username: null, token: null, id: null }
  if(window.localStorage.getItem('token')) {
    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token')
    const id = window.localStorage.getItem('id')
    return { username, token, id }
  }
  return user
}

export default getUserIfUserAlreadyLoggedIn