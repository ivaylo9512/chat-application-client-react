import React, { useRef } from 'react';
import {Link, useHistory} from 'react-router-dom'

const Header = ({chatsContainer, logout, appType}) => {
    const header = useRef()
    const menuCircle = useRef()
    const history = useHistory()
    const nav = useRef()
    const rotationDeg = useRef(0)

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

    const rotateNav = (e) => {
        const newDeg = rotationDeg.current + (e.deltaY + e.deltaX) * 0.1
        rotationDeg.current = newDeg
        
        nav.current.style.msTransform = `rotate(${newDeg}deg)`
        nav.current.style.webkitTransform = `rotate(${newDeg}deg)`
        nav.current.style.MozTransform = `rotate(${newDeg}deg)`
        nav.current.style.OTransform = `rotate(${newDeg}deg)`
        nav.current.style.transform = `rotate(${newDeg}deg)`
    }

    return (
        <div ref={header} className='header-container'>
            <button className='menu-circle' onClick={showHeader} ref={menuCircle}><i className='fas fa-bars'></i></button>
            <header>
                <div className='circle-nav' ref={nav} onWheel={rotateNav} id='cn-wrapper'>
                    <button onClick={hideMenu} className='circle-btn'>-</button>
                    <ul>
                        <li><button><i className='fas fa-user'></i></button></li>
                        <li><button onClick={toggleChats}><i className='fas fa-comments'></i></button></li>
                        <li><button><Link to='/searchChat'><i className='fas fa-search'></i></Link></button></li>
                        <li><button><Link to='/searchUsers'><i className='fas fa-user-plus'></i></Link></button></li>
                        {appType == 'restaurant' && 
                            <>
                                <li><button>R</button></li>
                            </>
                        }                        
                        <li><button onClick={logoutAndRedirect}><i className='fas fa-sign-out-alt'></i></button></li>
                        {appType == 'restaurant' && 
                            <>
                                <li><button><i className="fas fa-salad"></i>></button></li>
                                <li><button><i className="fas fa-plus-circle"></i>></button></li>
                                <li><button><i className="fas fa-bell"></i></button></li>
                            </>
                        }
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header