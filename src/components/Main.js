import React, { Component } from 'react'
import WebSocket from './WebSocket'
import UsersList from './UsersList';
import SearchUsers from './SearchUsers';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import SearchChat from './SearchChat';
import Chat from './Chat'
import MessageForm from './MessageForm'

class Main extends Component{

    state = {
        currentChat: undefined,
        foundUsers: [],
        chats: [],
        filteredChats: [],
    }

    setWebSocketClient = (client) => {
        client.subscribe("/user/message", this.recievedMessage)
        client.subscribe("/user/createChat", this.recievedNewChat)
        
        this.client = client
    }

    recievedMessage = (message) => {
        console.log(message.body)
    }

    recievedNewChat = (message) => {
        console.log(message.body)
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

    createNewChat = (userId) => {
        console.log("hey")
    }

    sendNewMessage = (message) => { 
        const chatId = this.state.currentChat.id
        const receiverId = this.state.currentChat.user.id
        this.client.publish({destination: '/api/message', body: JSON.stringify({chatId, receiverId, message}), headers: {'Authorization': localStorage.getItem('Authorization')}});
    }

    render(){
        return(
            <div className="main-container">
                <WebSocket setWebSocketClient={this.setWebSocketClient} />
         
                <Route path="/searchUsers" render={({history}) => <UsersList  history={history} createNewChat={this.createNewChat} foundUsers={this.state.foundUsers} />} />
                <Route path="/searchUsers" render={() => <SearchUsers removeCurrentChat={this.removeCurrentChat} setFoundUsers={this.setFoundUsers} />} />
                <Route path="/searchChat" render={() => <div className="chats"></div>} />
                <Route path="/searchChat" render={() => <SearchChat searchChats={this.props.searchChats}/>} />
                <Route exact path="/" render={() => <p>No chat is selected!</p>} />

                <Route path="/chat" render={() => this.props.currentChat !== undefined ? 
                    <div className="chat-container">
                        <Chat removeCurrentChat={this.removeCurrentChat} chat={this.props.currentChat} />
                        <MessageForm sendNewMessage={this.sendNewMessage} />
                    </div> :
                    <p>No chat is selected!</p>
                }/>
            </div>
        )
    }
}

export default Main