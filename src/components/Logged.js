import React, { useState, useEffect, useCallback } from 'react';
import Main from './Main';
import Menu from './Menu'
import HeaderScroll from './HeaderScroll';
import useRequest from '../hooks/useRequest'

const Logged = ({logout, user, appType}) => {
    const [currentList, setCurrentList] = useState([]) 
    const [headerType, setHeaderType] = useState('chats')
    const [currentChat, setCurrentChat] = useState(undefined)
    const [headerClass, setHeaderClass] = useState('header-scroll hidden')
    const [chats, chatsError, setChatsParams, setChatsUrl, fetchChats] = useRequest('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    }, [], false)
    const [orders, ordersError, setOrdersParams, setOrdersUrl, fetchOrders] = useRequest('http://localhost:8080/api/orders/auth/getOrders',{
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    }, [], false)

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
        async function fetch(){
            const result = await fetchChats()
            setCurrentList(result)
        }
        fetch()

        if(appType == 'restuarant'){
            fetchOrders()
        }
    }, [appType])

    return(
        <div className='content-container'>
            <HeaderScroll setCurrentChat={setCurrentChat} headerClass={headerClass} headerType={headerType} currentList={currentList}/>
            <div className='content'>
                <Menu headerClass={headerClass} headerType={headerType} setHeader={setHeader} setHeaderClass={setHeaderClass} logout={logout} appType={appType}/>
                <Main searchChats={searchChats} currentChat={currentChat}/>
            </div>
        </div>
    )
} 
export default Logged