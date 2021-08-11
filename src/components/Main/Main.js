import React, { useState } from 'react'
import WebSocket from '../../utils/WebSocket'
import UsersList from '../UsersList/UsersList';
import { Route, Redirect, Switch } from 'react-router-dom'
import Form from '../Form/Form';
import ChatView from '../ChatView/ChatView'
import './Main.css'
import useEffectInitial from '../../hooks/useEffectInitial';
import { getUsersQuery, usersRequest, resetUsersState } from '../../app/slices/usersSlice';
import UserChatsView from '../UserChatsView/UserChatsView';

const Main = () => {
    const [webSocketClient, setWebSocketClient] = useState()

    return(
        <main>
            <WebSocket setWebSocketClient={setWebSocketClient}/>            
            <Switch>
                <Route path='/searchUsers' render={() => 
                    <>
                        <UsersList  />
                        <Form action={usersRequest} resetState={resetUsersState} selector={getUsersQuery} placeholder={'search users'} />
                    </>
                }/>
                <Route path='/searchChat' render={() => <UserChatsView /> }/>
                <Route path='/chat/:id' render={() => <ChatView webSocketClient={webSocketClient}/>}/>
                <Route path='/home' render={() => <p>Select a chat!</p>}/>
                <Redirect from='/' to='/home'/>
            </Switch>
        </main>
    )
}

export default Main