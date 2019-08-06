const initialState = {
    user: null
}

export const setAuthenticatedUser = (user) => {
    return {
        type: 'LOG_IN_USER',
        payload: user
    }
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOG_IN_USER':
            return action.payload
        default:
            return state
    }
}

export default userReducer

