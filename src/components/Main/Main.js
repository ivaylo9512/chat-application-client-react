import React, { useState, useRef, useEffect } from 'react'
import WebSocket from '../../utils/WebSocket'
import UsersList from '../UsersList/UsersList';
import { Route, Redirect, Switch } from 'react-router-dom'
import Form from '../Form/Form';
import ChatView from '../ChatView/ChatView'
import './Main.css'
import useEffectInitial from '../../hooks/useEffectInitial';
import { useSelector } from 'react-redux';
import { getStylesSearchState } from '../../app/slices/stylesSlice';

const Main = ({searchChats, searchClass}) => {
    const [webSocketClient, setWebSocketClient] = useState()
    const isSearchHidden = useSelector(getStylesSearchState);


    return(
        <main>
            <WebSocket setWebSocketClient={setWebSocketClient}/>            
            <Switch>
                <Route path='/searchUsers' render={({history}) => 
                    <>
                        <UsersList history={history} createNewChat={createNewChat} foundUsers={foundUsers}/>
                        <Form searchClass={`form-container${isSearchHidden ? ' hidden' : ''}`} callback={searchUsers} placeholder={'search users'}/>
                    </>
                }/>
                <Route path='/searchChat' render={() => <Form searchClass={searchClass} callback={searchChats} placeholder={'search chat'} onUnmount={searchChats}/>}/>
                <Route path='/chat/:id' render={() => <ChatView webSocketClient={webSocketClient}/>}/>
                <Route path='/home' render={() => <p>No chat is selected!</p>}/>
                <Redirect from='/' to='/home'/>
            </Switch>
        </main>
    )
}

export default Main