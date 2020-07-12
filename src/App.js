import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import ChatUsersList from './components/ChatUsersList';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main';

const App = () => {
    const [user, setUser] = useState(undefined)
    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null);
    const [currentChat, setCurrentChat] = useState(undefined)
    const [chatsContainer, setChatsContainer] = useState(undefined)

    const removeAuthenticated = () => {
        setUser(null)
        removeAuth()
    }

    const setUserChats = (chats) => {
        setFilteredChats(chats)
        setChats(chats)
    }

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

    return (
        <div className="root">
            <Router>
                {auth ? 
                    <div>
                        <ChatUsersList setUserChats={setUserChats} setCurrentChat={setCurrentChat} setChatsContainer={setChatsContainer} chats={filteredChats} />
                        <div className="content">
                            <Header chatsContainer={chatsContainer} removeAuthenticated={removeAuthenticated}/>
                            <Main searchChats={searchChats} currentChat={currentChat}/>
                        </div>
                    </div> :
                    <Route path="/login" render={() => <Login setUser={setUser} setAuth={setAuth} />} />                               
                }
            </Router>
        </div>
    )
}

export default App;
