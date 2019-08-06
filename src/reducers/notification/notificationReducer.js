export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export const showNotification = (text) => {
    return {
        type: SHOW_NOTIFICATION,
        text
    }
}

export const hideNotification = () => {
    return {
        type: HIDE_NOTIFICATION
    }
}

const initialState = {
    isVisible: false,
    text: ''
}

const notificationReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                isVisible: true,
                text: action.text
            }
        case HIDE_NOTIFICATION:
            return {
                isVisible: false,
                text: ''
            }
        default:
            return state
    }
}

export default notificationReducer