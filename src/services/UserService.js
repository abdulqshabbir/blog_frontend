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
    try {
        const response = await axios.get(`${BASE_URL}/users`)
        if (response.status === 200) {
            const users = await response.data
            return users
        }
    } catch(e) {
        console.log(e)
    }
}

const fetchUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`)
        if (response.status === 200) {
            const users = await response.data
            const user = users.find(u => u.id === id)
            if (!user) {
                return null
            } else {
                return user
            }
        }
        return null
    } catch(e) {
        console.log(e)
    }
}

export const userService = {
    login,
    logout,
    fetchAllUsers,
    fetchUserById
}