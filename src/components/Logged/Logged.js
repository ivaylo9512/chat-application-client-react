import React, { useState, useEffect, useCallback, useRef } from 'react';
import Main from '../Main/Main';
import Menu from '../Menu/Menu'
import HeaderScroll from '../HeaderScroll/HeaderScroll';

const Logged = () => {
    const [searchClass, setSearchClass] = useState('form-container')
    
    const [chats, setChats] = useState([])

    return(
        <section className='content-container'>
            <HeaderScroll />
            <div className='content'>
                <Menu />
                <Main />
            </div>
        </section>
    )
} 
export default Logged