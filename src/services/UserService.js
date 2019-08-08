import axios from 'axios'
const BASE_URL = 'http://localhost:5000/api'

const setUserInLocalStorage = (user) => {
    window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user.token)
    window.localStorage.setItem('id', user.id)
}

const login = async (username, password) => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const response = await axios.post(`${BASE_URL}/login`, { username, password }, requestOptions)

        if (response.status === 400 || response.status === 401) {
            logout()
            return null
        }

        else {
            const user = await response.data
            setUserInLocalStorage(user)
            return user
        }
    } catch (e) {
        console.log(e)
    }
}

const logout = () => {
    window.localStorage.clear()
}

const fetchAllUsers = async () => {
}

export const userService = {
    login,
    logout,
    fetchAllUsers
}