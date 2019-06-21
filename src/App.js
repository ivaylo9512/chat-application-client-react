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

class App extends Component {
    state = {
        chat: undefined,
        foundUsers: [],
        user: undefined,
        chats: [],
        filteredChats: [],
        isAuth: false
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
    setCurrentChat(chat){
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
                <WebSocket />
                {this.state.isAuth && <ChatUsersList setUserChats={this.setUserChats} chats={this.state.filteredChats} />}
                <Router>
                    <Header logout={this.logout} />
                    <Route path="/login" render={() => <Login setUser={this.setUser} />} />
                    <Route path="/searchUsers" render={() => <SearchUsers setFoundUsers={this.setFoundUsers} />} />
                    <Route path="/searchUsers" render={() => <UsersList foundUsers={this.state.foundUsers} />} />
                </Router>
                {this.state.chat != undefined && <Chat chat={this.state.chat} />}
                <SearchChat searchChats={this.searchChats}/>
            </div>
        )
    }
}
export default App;
