import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './Menu.css'
const Menu = ({setHeader, headerClass, searchClass, headerType, setHeaderClass, setSearchClass}) => {
    const [menuClass, setMenuClass] = useState('menu-container hidden')
    const [rotate, setRotate] = useState({})
    const nav = useRef()
    const appType = useRef(localStorage.getItem('AppType'))
    const location = useLocation()
    const [rotationStyle, setrotationStyle] = useState(0)
    const isRotating = useRef(false)
    const rotatingSign = useRef()
    const minRotation = -60

    const toggleMenu = () => {
        setMenuClass(menuClass == 'menu-container hidden' ? 'menu-container' : 'menu-container hidden')    
    }

    const toggleHeader = () => { 
        setHeaderClass(headerClass == 'header-scroll hidden' ? 'header-scroll' : 'header-scroll hidden')    
    }
    
    const toggleSearch = () => {
        setSearchClass(searchClass == 'form-container hidden' ? 'form-container' : 'form-container hidden')    
    }
    
    const rotateNav = (e) => {
        const sign = Math.sign(e.deltaY + e.deltaX)
        if(!isRotating.current || sign != rotatingSign.current){
            rotatingSign.current = sign
            const newDeg = 20 * sign
            const max = -rotationStyle
            const min = -60 - rotationStyle  
            smoothRotate(Math.min(Math.max(newDeg, min), max), 650, rotationStyle)
        }
    }

    const smoothRotate = (deg, durration, startPos) => {
        let startTime = null;

        const rotate = (currentTime) => {
            isRotating.current = true
            if(!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            const amount = linearTween(timeElapsed, startPos, deg, durration);
            const rotateString = `rotate(${amount}deg)`
            setRotate({WebkitTransform: rotateString, MozTransform: rotateString, OTransform: rotateString, transform: rotateString})
            setrotationStyle(amount)
            
            if(durration / 2 < timeElapsed ) isRotating.current = false
            if(timeElapsed < durration) return requestAnimationFrame(rotate);
        }

        const linearTween = (t, b, c, d) => c*t/d + b;

        requestAnimationFrame(rotate);
    }

    const showRestMenu = () => {
        const deg = -60 - rotationStyle
        const transition = deg / -20 * 650
        smoothRotate(deg, transition, rotationStyle)
    }

    const showChatMenu = () => {
        const deg = -rotationStyle
        const transition = deg / 20 * 650
        smoothRotate(deg, transition, rotationStyle)
    }

    return (
        <div className={menuClass}>
            <button className='menu-circle' onClick={toggleMenu} tabIndex='-1'><i className='fas fa-bars'></i></button>
            <div>
                <div className='circle-nav' onWheel={rotateNav} id='cn-wrapper'>
                    <button onClick={toggleMenu} className='circle-btn' tabIndex='-1'>-</button>
                    <nav ref={nav} style={rotate}>
                        <div>
                            <button tabIndex='-1'>
                                <i className='fas fa-user'></i>
                            </button>
                        </div>
                        <div>
                            <button onClick={toggleHeader} tabIndex='-1'>
                                <i className={headerClass == 'header-scroll hidden' ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                            </button>
                        </div>
                        <div>
                            <Link to='/searchChat' tabIndex='-1'>
                                <i className='fas fa-search'></i>
                            </Link>
                        </div>
                        <div>
                            <Link to='/searchUsers' tabIndex='-1'>
                                <i className='fas fa-user-plus'></i>
                            </Link>
                        </div>
                        {(location.pathname == '/searchUsers' || location.pathname == '/searchChat') &&
                            <div>
                                <button onClick={toggleSearch}>
                                    <i className={searchClass == 'form-container' ? 'fas fa-caret-down' : 'fas fa-caret-up' }></i>
                                </button>
                            </div>
                        }
                        {appType == 'restaurant' && 
                            <>
                                <div>
                                    <button onClick={rotationStyle <= minRotation ? showChatMenu : showRestMenu} tabIndex='-1'>
                                        {rotationStyle <= minRotation ? 'C' : 'R'}
                                    </button>
                                </div>
                            </>
                        }                        
                        <div>
                            <Link to='/logout' tabIndex='-1'>
                                <i className='fas fa-sign-out-alt'></i>
                            </Link>
                        </div>
                        {appType == 'restaurant' && 
                            <>
                                <div>
                                    <button onClick={setHeader} tabIndex='-1'>
                                        <i className= {headerType == 'chats' ? 'fas fa-comments' : 'fas fa-utensils' }></i>
                                    </button>
                                </div>
                                <div>
                                    <button tabIndex='-1'>
                                        <i className='fas fa-plus-circle'></i>
                                    </button>
                                </div>
                                <div>
                                    <button tabIndex='-1'>
                                        <i className='fas fa-bell'></i>
                                    </button>
                                </div>
                            </>
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Menu