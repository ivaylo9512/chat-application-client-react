import React, { useState } from 'react'
import WebSocket from '../../utils/WebSocket'
import { Route, Redirect, Switch } from 'react-router-dom'
import ChatView from '../ChatView/ChatView'
import './Main.css'
import useEffectInitial from '../../hooks/useEffectInitial';
import UserChatsView from '../UserChatsView/UserChatsView';
import UsersView from '../UsersView/UsersView'

const Main = () => {
    const [webSocketClient, setWebSocketClient] = useState()

    return(
        <main>
            <WebSocket setWebSocketClient={setWebSocketClient}/>            
            <Switch>
                <Route path='/searchUsers' render={() => <UsersView />}/>
                <Route path='/searchChat' render={() => <UserChatsView /> }/>
                <Route path='/chat/:id' render={() => <ChatView webSocketClient={webSocketClient}/>}/>
                <Route path='/home' render={() => <p>Select a chat!</p>}/>
                <Redirect from='/' to='/home'/>
            </Switch>
        </main>
    )
}

export default Main