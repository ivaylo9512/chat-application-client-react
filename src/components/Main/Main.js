import React, { useState, useRef, useEffect } from 'react'
import WebSocket from '../../Helpers/WebSocket'
import UsersList from '../UsersList/UsersList';
import { Route, Redirect, Switch } from 'react-router-dom'
import Form from '../Form/Form';
import ChatView from '../ChatView/ChatView'
import OrderView from '../OrderView/OrderView'
import { useRequest } from '../../hooks/useRequest';
import './Main.css'

const Main = ({searchChats, searchClass, chats, orders}) => {
    const [foundUsers, setFoundUsers] = useState([])
    const [webSocketClient, setWebSocketClient] = useState()
    const [users, fetchRequest] = useRequest({initialValue: [], isAuth: true, callback: setFoundUsers})
    const appType = useRef(localStorage.getItem('AppType'))
    const isMounted = useRef(false)

    const searchUsers = name => {
        fetchRequest({url:`http://${localStorage.getItem('BaseUrl')}/api/users/auth/searchForUsers/${name}`})
    }

    return(
        <main className='main-container'>
            <WebSocket setWebSocketClient={setWebSocketClient}/>            
            <Switch>
                    {appType == 'restuarant' && 
                        <Route path='/order/:id' render={() => <OrderView orders={orders}/>}/>
                    }
                    <Route path='/searchUsers' render={({history}) => 
                        <>
                            <UsersList history={history} createNewChat={createNewChat} foundUsers={foundUsers}/>
                            <Form searchClass={searchClass} callback={searchUsers} placeholder={'search users'}/>
                        </>
                    }/>
                    <Route path='/searchChat' render={() => <Form searchClass={searchClass} callback={searchChats} placeholder={'search chat'} onUnmount={searchChats}/>}/>
                    <Route path='/chat/:id' render={() => <ChatView chats={chats} webSocketClient={webSocketClient}/>}/>
                    <Route path='/home' render={() => <p>No chat is selected!</p>}/>
                    <Redirect from='/' to='/home'/>
            </Switch>
        </main>
    )
}

export default Main