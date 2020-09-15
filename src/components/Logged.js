import React, { useState, useEffect, useCallback, useRef } from 'react';
import Main from './Main/Main';
import Menu from './Menu/Menu'
import HeaderScroll from './HeaderScroll';
import useRequest from '../hooks/useRequest'

const Logged = ({user, setUser}) => {
    const [headerType, setHeaderType] = useState('chats')
    const [filteredChats, setfilteredChats] = useState([])
    const [headerClass, setHeaderClass] = useState('header-scroll hidden')
    const [searchClass, setSearchClass] = useState('form-container')
    const isLongPolling = useRef(localStorage.getItem('LongPolling'))
    const appType = useRef(localStorage.getItem('AppType'))
    const [,fetchUser] = useRequest({isAuth:true, initialUrl:`http://${localStorage.getItem('BaseUrl')}/api/users/auth/${isLongPolling.current}getLoggedUser/20`, callback: setUser})
    
    const [chats, setChats] = useState([])
    const [orders, setOrders] = useState([])

    const setData = useCallback((data) => {
        setChats([...chats, ...data.chats])
        setOrders([...orders, ...data.orders])
    },[]) 

    const [longPollingData, fetchPolling] = useRequest({initialUrl: `http://${localStorage.getItem('BaseUrl')}/api/polling/auth/waitData`, initialValue:[], isAuth: true, callback: setData})

    const searchChats = (name) => {
        name = name.toUpperCase()
        setfilteredChats(chats.filter(chat => { 
            const firstName = chat.user.firstName.toUpperCase()
            const lastName = chat.user.lastName.toUpperCase()
            if(firstName.startsWith(name) || lastName.startsWith(name) ||(`${firstName} ${lastName}`).startsWith(name)){
                return chat
            }
            return null;
        }))
        setHeaderType('chats')
    }

    const setHeader = useCallback(() => {
        setHeaderType(headerType == 'chats' ? 'chats' : 'orders')
    }, [])

    useEffect(() => {
        if(appType == 'restuarant'){
            if(isLongPolling){
                fetchPolling()
            }
        }
    }, [])

    useEffect(() => {
        if(user){
            setfilteredChats(user.chats)
            setChats(user.chats)
            if(appType == 'restaurant'){
                setOrders(user.orders)
            }
        }else{
            fetchUser()
        }
    }, [user])

    return(
        <section className='content-container'>
            <HeaderScroll headerClass={headerClass} headerType={headerType} currentList={headerType == 'chats' ? filteredChats : orders}/>
            <div className='content'>
                <Menu headerClass={headerClass} searchClass={searchClass} headerType={headerType} setHeader={setHeader} setHeaderClass={setHeaderClass} setSearchClass={setSearchClass}/>
                <Main searchChats={searchChats} searchClass={searchClass} chats={chats} orders={orders}/>
            </div>
        </section>
    )
} 
export default Logged