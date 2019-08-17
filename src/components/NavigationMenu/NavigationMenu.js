import React, { useState } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../reducers/user/userReducer'
import { Menu } from 'semantic-ui-react'

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const NavigationMenu = ({ user, logoutUser, history }) => {
    const [ activeItem, setActiveItem ] = useState('blogs')
    return (
        <Menu pointing secondary>
                <Menu.Item
                    name={'blogs'}
                    active={activeItem === 'blogs'}
                    onClick={() => {
                        setActiveItem('blogs')
                        history.push('/blogs')
                    }}
                />
                <Menu.Item
                    name="users"
                    active={activeItem === 'users'}
                    onClick={() => {
                        setActiveItem('users')
                        history.push('/users')
                    }}
                />
            <Menu.Item name={`${user.username} currently logged in.`} position="right"/>
            <Menu.Item name="logout" position="right" active={activeItem === 'logout'} onClick={logoutUser}/>
        </Menu>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)