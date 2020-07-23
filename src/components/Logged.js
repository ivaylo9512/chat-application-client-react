import React, { useState, useEffect, useRef, useCallback } from 'react';
import Main from './Main';
import Menu from './Menu'
import HeaderScroll from './HeaderScroll';

const Logged = ({logout, user, appType}) => {
    const [currentList, setCurrentList] = useState([]) 
    const [chats, setChats] = useState([])
    const [orders, setOrders] = useState() 
    const [headerType, setHeaderType] = useState('chats')
    const [currentChat, setCurrentChat] = useState(undefined)
    const [headerClass, setHeaderClass] = useState('header-scroll hidden')
    const [error, setError] = useState('')
    const isMounted = useRef(false)


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
        setCurrentList(filteredChats)
        setHeaderType('chats')
    }

    const setHeader = useCallback(() => {
        if(headerType == 'chats'){
            setHeaderType('orders')
            setCurrentList(chats)
        }else{
            setHeaderType('orders')
            setCurrentList(orders)
        }
    })

    useEffect(() =>  {
        let isCurrent =  true;
        if(isMounted){
            async function fetchChats(){
                const response = await fetch('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        const chats = JSON.parse(data)
                        setChats(chats)
                        setCurrentList(chats)
                    }else{
                        setError(data)
                    }
                }  
            }   
            fetchChats() 
        }
        return () => isCurrent = false
    }, [])

    useEffect(() =>  {
        let isCurrent =  true;
        if(!isMounted.current){
            isMounted.current = true
        }else{
            async function fetchOrders(){
                const response = await fetch('http://localhost:8080/api/orders/auth/getOrders',{
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        setOrders(JSON.parse(data))
                    }else{
                        setError(data)                
                    }
                }  
            }   
            fetchOrders() 
        }
        return () => isCurrent = false
    }, [])


    return(
        <div>
            <HeaderScroll setCurrentChat={setCurrentChat} headerClass={headerClass} headerType={headerType} currentList={currentList}/>
            <div className='content'>
                <Menu headerClass={headerClass} headerType={headerType} setHeader={setHeader} setHeaderClass={setHeaderClass} logout={logout} appType={appType}/>
                <Main searchChats={searchChats} currentChat={currentChat}/>
            </div>
        </div>
    )
} 
export default Logged