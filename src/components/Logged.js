import React, { useState, useEffect, useCallback } from 'react';
import Main from './Main';
import Menu from './Menu'
import HeaderScroll from './HeaderScroll';
import useRequest from '../hooks/useRequest'

const Logged = ({user, appType}) => {
    const [headerType, setHeaderType] = useState('chats')
    const [filteredChats, setfilteredChats] = useState([])
    const [headerClass, setHeaderClass] = useState('header-scroll hidden')
    const [searchClass, setSearchClass] = useState('form-container')
    const isLongPolling = useRef(localStorage.getItem('LongPolling'))

    const [chats, fetchChats, ordersError, setChats] = useRequest({initialUrl:`http://${localStorage.getItem('BaseUrl')}/api/chat/auth/getChats?pageSize=3`, initialValue:[], isAuth: true, fetchOnMount:!isLongPolling, callback:setfilteredChats})
    const [orders, fetchOrders, chatsError, setOrders] = useRequest({initialUrl: `http://${localStorage.getItem('BaseUrl')}/api/orders/auth/getOrders`, initialValue:[], isAuth: true})

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
            if(!isLongPolling){
                fetchOrders()
            }else{
                fetchPolling()
            }
        }
    }, [appType])

    useEffect(() => {
        setfilteredChats(user.chats)
        setChats(user.chats)
        setOrders(user.orders)
    }, [user])

    return(
        <div className='content-container'>
            <HeaderScroll headerClass={headerClass} headerType={headerType} currentList={headerType == 'chats' ? filteredChats : orders}/>
            <div className='content'>
                <Menu headerClass={headerClass} searchClass={searchClass} headerType={headerType} setHeader={setHeader} setHeaderClass={setHeaderClass} setSearchClass={setSearchClass} appType={appType}/>
                <Main searchChats={searchChats} searchClass={searchClass} chats={chats} orders={orders}/>
            </div>
        </div>
    )
} 
export default Logged