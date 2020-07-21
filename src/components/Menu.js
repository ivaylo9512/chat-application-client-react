import React, { useRef } from 'react';
import {Link, useHistory} from 'react-router-dom'

const Menu = ({chatsContainer, logout, appType}) => {
    const header = useRef()
    const menuCircle = useRef()
    const history = useHistory()
    const nav = useRef()
    const rotationDeg = useRef(0)
    const isRotating = useRef(false)
    const rotatingSign = useRef()

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
        const sign = Math.sign(e.deltaY + e.deltaX)
        if(!isRotating.current || sign != rotatingSign.current){
            rotatingSign.current = sign
            const newDeg = 20 * sign
            const max = -rotationDeg.current
            const min = -60 - rotationDeg.current  
            smoothRotate(Math.min(Math.max(newDeg, min), max), 650, rotationDeg.current)
        }
        

    }

    const smoothRotate = (deg, durration, startPos) => {
        let startTime = null;

        const rotate = (currentTime) => {
            isRotating.current = true
            if(!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            const amount = linearTween(timeElapsed, startPos, deg, durration);

            nav.current.style.msTransform = `rotate(${amount}deg)`
            nav.current.style.webkitTransform = `rotate(${amount}deg)`
            nav.current.style.MozTransform = `rotate(${amount}deg)`
            nav.current.style.OTransform = `rotate(${amount}deg)`
            nav.current.style.transform = `rotate(${amount}deg)`
            rotationDeg.current = amount
            
            if(durration / 2 < timeElapsed ) isRotating.current = false
            if(timeElapsed < durration) return requestAnimationFrame(rotate);
        }

        const linearTween = (t, b, c, d) => c*t/d + b;

        requestAnimationFrame(rotate);
    }

    return (
        <div ref={header} className='menu-container'>
            <button className='menu-circle' onClick={showHeader} ref={menuCircle} tabIndex="-1"><i className='fas fa-bars'></i></button>
            <div>
                <div className='circle-nav' onWheel={rotateNav} id='cn-wrapper'>
                    <button onClick={hideMenu} className='circle-btn' tabIndex="-1">-</button>
                    <ul ref={nav}>
                        <li><button tabIndex="-1"><i className='fas fa-user'></i></button></li>
                        <li><button onClick={toggleChats} tabIndex="-1"><i className='fas fa-comments'></i></button></li>
                        <li><Link to='/searchChat' tabIndex="-1"><i className='fas fa-search'></i></Link></li>
                        <li><Link to='/searchUsers' tabIndex="-1"><i className='fas fa-user-plus'></i></Link></li>
                        {appType == 'restaurant' && 
                            <>
                                <li><button tabIndex="-1">R</button></li>
                            </>
                        }                        
                        <li><button onClick={logoutAndRedirect} tabIndex="-1"><i className='fas fa-sign-out-alt'></i></button></li>
                        {appType == 'restaurant' && 
                            <>
                                <li><button tabIndex="-1"><i className="fas fa-salad"></i></button></li>
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