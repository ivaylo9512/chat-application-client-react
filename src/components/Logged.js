import React, {useState, useCallback} from 'react'
import Main from './Main';
import Menu from './Menu'
import ChatUsersList from './ChatUsersList';

const Logged = ({logout, user, appType}) => {

    const [chats, setChats] = useState([])
    const [orders, setOrders] = useState() 
    const [filteredChats, setFilteredChats] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const [chatsClass, setChatsClass] = useState('chat-users hidden')

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
        setFilteredChats(filteredChats)
    }

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
                        setFilteredChats(chats)
                        setChats(chats)
                    }else{
                        setError(data)
                    }
                }  
            }   
            fetchChats() 
        }
        return () => isCurrent = false
    }, [setUserChats])

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
            <ChatUsersList setChats={setUserChats} setCurrentChat={setCurrentChat} chatsClass={chatsClass} userChats={filteredChats} />
            <div className='content'>
                <Menu chatClass={chatsClass} setChatsClass={setChatsClass} logout={logout} appType={appType}/>
                <Main searchChats={searchChats} currentChat={currentChat}/>
            </div>
        </div>
    )
} 
export default Logged