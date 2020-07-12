import React from 'react';
import {Route, Redirect, Link, useHistory} from 'react-router-dom'

const Header = ({chatsContainer, removeAuthenticated}) => {
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

    const logout = () => {
        removeAuthenticated()
        history.push("/login")
    }

    return (
        <div ref={header} className="header-container">
            <button className="menu-circle" onClick={showHeader} ref={menuCircle}><i className="fas fa-bars"></i></button>
            <header>
                <button onClick={hideMenu} className="circle-btn">-</button>
                <div className="circle-nav" id="cn-wrapper">
                    <ul>
                        <li><span><i className="fas fa-user"></i></span></li>
                        <li><span onClick={toggleChats}><i className="fas fa-comments"></i></span></li>
                        <li><Link to="/searchChat"><i className="fas fa-search"></i></Link></li>
                        <li><Link to="/searchUsers"><i className="fas fa-user-plus"></i></Link></li>
                        <li><span onClick={logout}><i className="fas fa-sign-out-alt"></i></span></li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header