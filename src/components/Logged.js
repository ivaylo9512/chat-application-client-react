import React, { useState, useEffect, useCallback } from 'react';
import Main from './Main';
import Menu from './Menu'
import HeaderScroll from './HeaderScroll';
import useRequest from '../hooks/useRequest'

const Logged = ({user, appType}) => {
    const [currentList, setCurrentList] = useState([]) 
    const [headerType, setHeaderType] = useState('chats')
    const [chat, setChat] = useState(undefined)
    const [order, setOrder] = useState(undefined)
    const [headerClass, setHeaderClass] = useState('header-scroll hidden')
    const [searchClass, setSearchClass] = useState('form-container')

    const [chats] = useRequest({initialUrl:`http://${localStorage.getItem('BaseUrl')}/api/chat/auth/getChats?pageSize=3`, initialValue:[], isAuth: true, fetchOnMount:true, callback:setCurrentList})
    const [orders, fetchOrders] = useRequest({initialUrl: `http://${localStorage.getItem('BaseUrl')}/api/orders/auth/getOrders`, initialValue:[], isAuth: true})

    const searchChats = (name) => {
        name = name.toUpperCase()
        const filteredChats = chats.filter(chat => { 
            const firstName = chat.user.firstName.toUpperCase()
            const lastName = chat.user.lastName.toUpperCase()
            if(firstName.startsWith(name) || lastName.startsWith(name) ||(`${firstName} ${lastName}`).startsWith(name)){
                return chat
            }
            return null;
        })
        if(headerClass.includes('header-scroll')){
            setCurrentList(filteredChats)
            setHeaderType('chats')
            setHeaderClass('header-scroll')
        }
    }

    const setHeader = useCallback(() => {
        if(headerType == 'chats'){
            setHeaderType('orders')
            setCurrentList(chats)
        }else{
            setHeaderType('orders')
            setCurrentList(orders)
        }
    }, [])

    useEffect(() => {
        if(appType == 'restuarant'){
            fetchOrders()
        }
    }, [appType])

    return(
        <div className='content-container'>
            <HeaderScroll setOrder={setOrder} setChat={setChat} headerClass={headerClass} headerType={headerType} currentList={currentList}/>
            <div className='content'>
                <Menu headerClass={headerClass} searchClass={searchClass} headerType={headerType} setHeader={setHeader} setHeaderClass={setHeaderClass} setSearchClass={setSearchClass} appType={appType}/>
                <Main searchChats={searchChats} searchClass={searchClass} chat={chat} order={order}/>
            </div>
        </div>
    )
} 
export default Logged