import { useRef, useState } from 'react'
import MenuNav from 'components/MenuNav/MenuNav'
import { MenuContainer, MenuCircle, CircleNav, CircleBtn } from './MenuStyles';

const Menu = () => {
    const [rotate, setRotate] = useState({});
    const [isMenuHidden, setIsMenuHidden] = useState(true)
    const [rotationStyle, setrotationStyle] = useState(0)
    const isRotating = useRef(false)
    const rotatingSign = useRef()
    
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
        let startTime;

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
        <MenuContainer isHidden={isMenuHidden}>
            <MenuCircle onClick={() => setIsMenuHidden(!isMenuHidden)} tabIndex='-1'><i className='fas fa-bars'></i></MenuCircle>
            <div>
                <CircleNav onWheel={rotateNav}>
                    <CircleBtn onClick={() => setIsMenuHidden(!isMenuHidden)} tabIndex='-1'>-</CircleBtn>
                    <MenuNav rotate={rotate}/>
                </CircleNav>
            </div>
        </MenuContainer>
    )
}

export default Menu