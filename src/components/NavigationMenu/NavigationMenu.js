import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

const NavigationMenu = ({ user, logoutUser }) => {
    const [ activeItem, setActiveItem ] = useState('blogs')
    return (
        <Menu pointing secondary>
            <Link to="/blogs">
                <Menu.Item name={'blogs'} active={activeItem === 'blogs'} onClick={() => setActiveItem('blogs')} />
            </Link>
            <Link to="/users">
                <Menu.Item name="users" active={activeItem === 'users'} onClick={() => setActiveItem('users')} />
            </Link>
            <Menu.Item name={`${user.username} currently logged in.`} position="right"/>
            <Menu.Item name="logout" position="right" active={activeItem === 'logout'} onClick={logoutUser}/>
        </Menu>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)