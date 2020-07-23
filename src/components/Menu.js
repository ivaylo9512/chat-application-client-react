import React, { useRef, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'

const Menu = ({setHeader, headerClass, headerType, setHeaderClass, logout, appType}) => {
    const [menuClass, setMenuClass] = useState('menu-container hidden')
    const [rotate, setRotate] = useState({})
    const history = useHistory()
    const nav = useRef()
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
    
    const logoutAndRedirect = () => {
        logout()
        history.push('/login')
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
            <button className='menu-circle' onClick={toggleMenu} tabIndex="-1"><i className='fas fa-bars'></i></button>
            <div>
                <div className='circle-nav' onWheel={rotateNav} id='cn-wrapper'>
                    <button onClick={toggleMenu} className='circle-btn' tabIndex="-1">-</button>
                    <ul ref={nav} style={rotate}>
                        <li><button tabIndex="-1"><i className='fas fa-user'></i></button></li>
                        <li><button onClick={toggleHeader} tabIndex="-1"><i className={headerClass == 'header-scroll hidden' ? 'far fa-eye' : 'far fa-eye-slash'}></i></button></li>
                        <li><Link to='/searchChat' tabIndex="-1"><i className='fas fa-search'></i></Link></li>
                        <li><Link to='/searchUsers' tabIndex="-1"><i className='fas fa-user-plus'></i></Link></li>
                        {appType == 'restaurant' && 
                            <>
                                <li><button onClick={rotationStyle <= minRotation ? showChatMenu : showRestMenu} tabIndex="-1">{rotationStyle <= minRotation ? 'C' : 'R'}</button></li>
                            </>
                        }                        
                        <li><button onClick={logoutAndRedirect} tabIndex="-1"><i className='fas fa-sign-out-alt'></i></button></li>
                        {appType == 'restaurant' && 
                            <>
                                <li><button onClick={setHeader} tabIndex="-1"><i className= {headerType == 'chats' ? "fas fa-comments" : "fas fa-utensils" }></i></button></li>
                                <li><button tabIndex="-1"><i className="fas fa-plus-circle"></i></button></li>
                                <li><button tabIndex="-1"><i className="fas fa-bell"></i></button></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu