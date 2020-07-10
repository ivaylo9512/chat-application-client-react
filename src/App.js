import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import ChatUsersList from './components/ChatUsersList';
import { Route, useHistory, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main';

const App = () => {
    const [user, setUser] = useState(undefined)
    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [currentChat, setCurrentChat] = useState(undefined)
    let history = useHistory()

    const setAuthenticated = (user) => {
        setUser(user)
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem('Authorization')
        setUser(undefined)
        setIsAuth(false)

        history.push("/login")
    }

    const setUserChats = (chats) => {
        setFilteredChats(chats)
        setChats(chats)
    }

    const setChatList= (chats) => {
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

    const setChat = (currentChat) => {
        setCurrentChat(currentChat)
    }

    useEffect(() => {
        setIsAuth(localStorage.getItem('Authorization') !== null)

    }, localStorage.getItem('Authorization'))

    return (
        <div className="App">
            <Router>
                {isAuth && <ChatUsersList setChatList={setChatList} setChat={setChat} setUserChats={setUserChats} chats={filteredChats} />}
                <Route path="/login" render={() => <Login setAuthenticated={setAuthenticated} />} />                               
                <Route path="/logout" render={logout} />                    
                {isAuth && 
                    <div className="content">
                        <Header chats={chats} logout={logout} />
                        <Main searchChats={searchChats} currentChat={currentChat}/>
                    </div>
                }
            </Router>
        </div>
    )
}

export default App;
