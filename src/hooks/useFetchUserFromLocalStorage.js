import { useEffect } from 'react'
import store from './../store'
import { setAuthenticatedUser } from './../reducers/userReducer'

const useFetchUserFromLocalStorage = () => {
    useEffect(() => {
      if(window.localStorage.getItem('token')) {
        const username = window.localStorage.getItem('username')
        const token = window.localStorage.getItem('token')
        const id = window.localStorage.getItem('id')
        const user = {
          username,
          token,
          id
        }
        store.dispatch(setAuthenticatedUser(user))
      }
    }, [])
}

export default useFetchUserFromLocalStorage