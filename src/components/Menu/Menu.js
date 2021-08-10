import React, { useRef, useState } from 'react'
import './Menu.css'
import MenuNav from '../MenuNav/MenuNav'

const Menu = () => {
    const [rotate, setRotate] = useState({});
    const [isMenuHidden, setIsMenuHidden] = useState(true)
    const [rotationStyle, setrotationStyle] = useState(0)
    const isRotating = useRef(false)
    const rotatingSign = useRef()

    const toggleMenu = () => {
        setIsMenuHidden(!isMenuHidden)    
    }
    
    const rotateNav = (e) => {
        const sign = Math.sign(e.deltaY + e.deltaX)
        if(!isRotating.current || sign != rotatingSign.current){
            rotatingSign.current = sign
            const newDeg = 20 * sign
            const max = -rotationStyle
            const min = -30 - rotationStyle  
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

    return (
        <div className={`menu-container${isMenuHidden ? ' hidden' : ''}`}>
            <button className='menu-circle' onClick={toggleMenu} tabIndex='-1'><i className='fas fa-bars'></i></button>
            <div>
                <div className='circle-nav' onWheel={rotateNav} id='cn-wrapper'>
                    <button onClick={toggleMenu} className='circle-btn' tabIndex='-1'>-</button>
                    <MenuNav rotate={rotate}/>
                </div>
            </div>
        </div>
    )
}

export default Menu