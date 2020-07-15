import React from 'react';
import {Link, useHistory} from 'react-router-dom'

const Header = ({chatsContainer, logout}) => {
    const header = React.useRef()
    const menuCircle = React.useRef()
    const history = useHistory()


    const hideMenu = () => {
        header.current.classList.add('hide')
        menuCircle.current.classList.add('show')
    }

    const showHeader = () => {
        header.current.classList.remove('hide')
        menuCircle.current.classList.remove('show')
    }

    const toggleChats = () => {
        chatsContainer.current.classList.toggle('hide')
    }

    const logoutAndRedirect = () => {
        logout()
        history.push('/login')
    }

    return (
        <div ref={header} className='header-container'>
            <button className='menu-circle' onClick={showHeader} ref={menuCircle}><i className='fas fa-bars'></i></button>
            <header>
                <div className='circle-nav' id='cn-wrapper'>
                    <button onClick={hideMenu} className='circle-btn'>-</button>
                    <ul>
                        <li><button><i className='fas fa-user'></i></button></li>
                        <li><button onClick={toggleChats}><i className='fas fa-comments'></i></button></li>
                        <li><button><Link to='/searchChat'><i className='fas fa-search'></i></Link></button></li>
                        <li><button><Link to='/searchUsers'><i className='fas fa-user-plus'></i></Link></button></li>
                        <li><button onClick={logoutAndRedirect}><i className='fas fa-sign-out-alt'></i></button></li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header