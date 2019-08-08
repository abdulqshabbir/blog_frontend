import { userService } from './../../services/UserService'

// Action types
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const DO_NOT_AUTHENTICATE_USER = 'DO_NOT_AUTHENTICATE_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_USER = 'LOGIN_USER'

export const attemptToAuthenticateUser = (username, password) => {
    return async dispatch => {
        const user = await userService.login(username, password)

        if(!user || user.username === null) {
            dispatch({ type: DO_NOT_AUTHENTICATE_USER })
        } else {
            dispatch({
                type: LOGIN_USER,
                username: user.username,
                token: user.token,
                id: user.id
            })
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

