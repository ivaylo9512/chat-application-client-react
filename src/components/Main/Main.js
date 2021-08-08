import React, { useState } from 'react'
import WebSocket from '../../utils/WebSocket'
import UsersList from '../UsersList/UsersList';
import { Route, Redirect, Switch } from 'react-router-dom'
import Form from '../Form/Form';
import ChatView from '../ChatView/ChatView'
import './Main.css'
import useEffectInitial from '../../hooks/useEffectInitial';
import { getChatsQuery, chatsRequest, resetChatsState } from '../../app/slices/chatsSlice';
import { getUsersQuery, usersRequest, resetUsersState } from '../../app/slices/usersSlice';

const Main = ({searchChats}) => {
    const [webSocketClient, setWebSocketClient] = useState()


    return(
        <main>
            <WebSocket setWebSocketClient={setWebSocketClient}/>            
            <Switch>
                <Route path='/searchUsers' render={() => 
                    <>
                        <UsersList createNewChat={createNewChat} />
                        <Form action={usersRequest} selector={getUsersQuery} placeholder={'search users'} onUnmount={resetUsersState}/>
                    </>
                }/>
                <Route path='/searchChat' render={() => <Form action={chatsRequest} selector={getChatsQuery} placeholder={'search chat'} onUnmount={resetChatsState}/>}/>
                <Route path='/chat/:id' render={() => <ChatView webSocketClient={webSocketClient}/>}/>
                <Route path='/home' render={() => <p>No chat is selected!</p>}/>
                <Redirect from='/' to='/home'/>
            </Switch>
        </main>
    )
}

export default Main