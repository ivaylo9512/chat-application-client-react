import React, { useState } from 'react'
import WebSocket from '../../utils/WebSocket'
import { Route, Redirect, Switch } from 'react-router-dom'
import ChatView from '../ChatView/ChatView'
import './Main.css'
import useEffectInitial from '../../hooks/useEffectInitial';
import UserChatsView from '../UserChatsView/UserChatsView';
import UsersView from '../UsersView/UsersView'
import { MainContainer, P } from './MainStyle'

const Main = () => {
    const [webSocketClient, setWebSocketClient] = useState()

    return(
        <MainContainer>
            <WebSocket setWebSocketClient={setWebSocketClient}/>            
            <Switch>
                <Route path='/searchUsers' render={() => <UsersView />}/>
                <Route path='/searchChat' render={() => <UserChatsView /> }/>
                <Route path='/chat/:id' render={() => <ChatView webSocketClient={webSocketClient}/>}/>
                <Route path='/home' render={() => <P>Select a chat!</P>}/>
                <Redirect from='/' to='/home'/>
            </Switch>
        </MainContainer>
    )
}

export default Main