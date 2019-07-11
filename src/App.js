import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import SearchUsers from './components/SearchUsers';
import ChatUsersList from './components/ChatUsersList';
import SearchChat from './components/SearchChat';
import { Route,Link, BrowserRouter as Router } from 'react-router-dom'
import UsersList from './components/UsersList';
import Chat from './components/Chat'
import WebSocket from './components/WebSocket'
import MessageForm from './components/MessageForm'

class App extends Component {
    state = {
        chat: undefined,
        foundUsers: [],
        user: undefined,
        chats: [],
        filteredChats: [],
        isAuth: false,
    }

    setUser = (user) => {
        this.setState({
            user: user,
            isAuth: true
        })
    }

    logout = () => {
        localStorage.removeItem('Authorization')
        this.setState({
            user: undefined,
            isAuth: false
        })
    }

    setUserChats = (chats) => {
        this.setState({
            filteredChats: chats,
            chats: chats
        })
    }

    searchChats = (name) => {
        name = name.toUpperCase()
        const filteredChats = this.state.chats.filter(chat=> { 
            const firstName = chat.user.firstName.toUpperCase()
            const lastName = chat.user.lastName.toUpperCase()
            if(firstName.startsWith(name) || lastName.startsWith(name) ||(`${firstName} ${lastName}`).startsWith(name)){
                return chat
            }
        })
        this.setState({
            filteredChats 
        }) 
    }

    setWebSocketClient = (client) => {
        const createSubscription = client.subscribe("/user/message", this.recievedMessage)
        const messageSubscription = client.subscribe("/user/createChat", this.newChat)
        
        this.client = client
    }

    sendNewMessage = (message) => { 
        console.log(message)
    }

    createNewChat = (userId) => {
        this.client.publish({destination: '/api/createChat', body: userId, headers: {'Authorization': localStorage.getItem('Authorization')}});
    }
    recievedMessage = (message) => {
        console.log(message.body)
    }

    newChat = (message) => {
        console.log(message.body)
    }

    setCurrentChat = (chat) => {
        this.setState({
            chat
        })
    }

    setFoundUsers = (users) => {
        this.setState({
            foundUsers: users
        })
    }

    componentDidMount(){
        this.setState({ 
            isAuth: localStorage.getItem('Authorization') != undefined
        }) 
    }

    render() {
        return (
            <div className="App">
                <WebSocket setWebSocketClient={this.setWebSocketClient} />
                {this.state.isAuth && <ChatUsersList setCurrentChat={this.setCurrentChat} setUserChats={this.setUserChats} chats={this.state.filteredChats} />}
                <Router>
                    <Header logout={this.logout} />
                    <Route path="/login" render={() => <Login setUser={this.setUser} />} />
                    <Route path="/searchUsers" render={() => <SearchUsers setFoundUsers={this.setFoundUsers} />} />
                    <Route path="/searchUsers" render={() => <UsersList foundUsers={this.state.foundUsers} />} />
                </Router>
                {this.state.chat != undefined && 
                    <div>
                        <Chat chat={this.state.chat} />
                        <MessageForm sendNewMessage={this.sendNewMessage} />
                    </div>}
                <SearchChat searchChats={this.searchChats}/>
            </div>
        )
    }
}

export default App;
