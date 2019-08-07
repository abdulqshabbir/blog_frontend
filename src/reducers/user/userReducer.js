import axios from 'axios'

// Action types
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const DO_NOT_AUTHENTICATE_USER = 'DO_NOT_AUTHENTICATE_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_USER = 'LOGIN_USER'

const saveUserInLocalStorage = (username, id, token) => {
    const storage = window.localStorage
    storage.setItem('username', username)
    storage.setItem('token', token)
    storage.setItem('id', id)
}


// Action Creators
export const attemptToAuthenticateUser = (username, password) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/api/login', { username, password })
        if (response.status === 200) { //username and password match
            console.log('hellloooo')
            const username = response.data.userForToken.username
            const id = response.data.userForToken.id
            const token = response.data.token
            // save user in local storage
            saveUserInLocalStorage(username, id, token)

            //save user in redux storage
            dispatch({
                type: LOGIN_USER,
                username,
                token,
                id
            })
        } else {
            dispatch({ type: DO_NOT_AUTHENTICATE_USER })
        }
    }
}

export const loginUser = (username, token, id) => {
    return {
        type: LOGIN_USER,
        username,
        token,
        id
    }
}

export const doNotAuthenticateUser = (username, token, id) => {
    return {
        type: DO_NOT_AUTHENTICATE_USER,
        username,
        token,
        id
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

const initialState = {
    username: null,
    id: null,
    token: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return {
                username: action.username,
                token: action.token,
                id: action.id
            }

        case DO_NOT_AUTHENTICATE_USER:
            return {
                username: null,
                id: null,
                token: null
            }

        case LOGOUT_USER:
            return {
                username: null,
                id: null,
                token: null
            }

        default:
            return state
    }
}

export default userReducer

