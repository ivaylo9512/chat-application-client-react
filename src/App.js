import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import SearchUsers from './components/SearchUsers';
import ChatUsersList from './components/ChatUsersList';
import SearchChat from './components/SearchChat';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import UsersList from './components/UsersList';
import Chat from './components/Chat'
import WebSocket from './components/WebSocket'
import MessageForm from './components/MessageForm'

class App extends Component {
    state = {
        currentChat: undefined,
        isUserPane: false,
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
        const filteredChats = this.state.chats.filter(chat => { 
            const firstName = chat.user.firstName.toUpperCase()
            const lastName = chat.user.lastName.toUpperCase()
            if(firstName.startsWith(name) || lastName.startsWith(name) ||(`${firstName} ${lastName}`).startsWith(name)){
                return chat
            }
            return null;
        })

        this.setState({
            filteredChats 
        }) 
    }

    setWebSocketClient = (client) => {
        client.subscribe("/user/message", this.recievedMessage)
        client.subscribe("/user/createChat", this.recievedNewChat)
        
        this.client = client
    }

    sendNewMessage = (message) => { 
        const chatId = this.state.currentChat.id
        const receiverId = this.state.currentChat.user.id
        this.client.publish({destination: '/api/message', body: JSON.stringify({chatId, receiverId, message}), headers: {'Authorization': localStorage.getItem('Authorization')}});
    }

    createNewChat = (userId) => {
        console.log("hey")
    }
    recievedMessage = (message) => {
        console.log(message.body)
    }

    recievedNewChat = (message) => {
        console.log(message.body)
    }

    setCurrentChat = (currentChat) => {
        this.setState({
            currentChat
        })
    }

    removeCurrentChat = () => {
        this.setState({
            currentChat: undefined
        })
    }

    setFoundUsers = (users) => {
        this.setState({
            foundUsers: users
        })
    }

    componentDidMount(){
        this.setState({ 
            isAuth: localStorage.getItem('Authorization') !== undefined
        }) 
    }

    render() {
        return (
            <div className="App">
                {this.state.isAuth && <WebSocket setWebSocketClient={this.setWebSocketClient} />}
                <Router>
                    {this.state.isAuth && <ChatUsersList setChatList={chatList => (this.chatList = chatList)} setCurrentChat={this.setCurrentChat} setUserChats={this.setUserChats} chats={this.state.filteredChats} />}
                    <Route path="/login" render={() => <Login setUser={this.setUser} />} />
                    <Route path="/searchUsers" render={() => <SearchUsers removeCurrentChat={this.removeCurrentChat} setFoundUsers={this.setFoundUsers} />} />
                    <Route path="/searchUsers" render={({history}) => <UsersList  history={history} createNewChat={this.createNewChat} foundUsers={this.state.foundUsers} />} />
              
                    {this.state.currentChat !== undefined && 
                    <div>
                        <Route path="/chat" render={() => <Chat removeCurrentChat={this.removeCurrentChat} chat={this.state.currentChat} />} />
                        <Route path="/chat" render={() => <MessageForm sendNewMessage={this.sendNewMessage} />} />
                    </div>}
                    <Route path="/chat" render={() => <SearchChat searchChats={this.searchChats}/>} />
                 
                    <div className="content">
                        <Header chatList={this.chatList} logout={this.logout} />
                        <div className="messages-container">
                            <span>No chat is selected!</span>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;
