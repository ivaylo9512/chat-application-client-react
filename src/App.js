import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import ChatUsersList from './components/ChatUsersList';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main';
import { isatty } from 'tty';

const App = () => {
    const [user, setUser] = useState(undefined)
    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null);
    const [currentChat, setCurrentChat] = useState(null)

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
        <div className="App">
            <Router>
                {auth && <ChatUsersList setChats={setChats} setCurrentChat={setCurrentChat} setUserChats={setUserChats} chats={filteredChats} />}
                <Route path="/login" render={() => <Login setUser={setUser} setAuth={setAuth} />} />                               
                {auth && 
                    <div className="content">
                        <Header chats={chats} removeAuthenticated={removeAuthenticated}/>
                        <Main searchChats={searchChats} currentChat={currentChat}/>
                    </div>
                }
            </Router>
        </div>
    )
}

export default App;
