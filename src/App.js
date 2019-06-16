import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import SearchUsers from './components/SearchUsers';
import ChatUsersList from './components/ChatUsersList';
import SearchChat from './components/SearchChat';
import { Route,Link, BrowserRouter as Router } from 'react-router-dom'
import UsersList from './components/UsersList';

class App extends Component {
    state = {
        chat: undefined,
        foundUsers: [],
        user: undefined,
        chats: [],
        filteredChats : []
    }
    setUser = (user) => {
        this.setState({
            user: user
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
    }
    setFoundUsers = (users) => {
        this.setState({
            foundUsers: users
        })
    }
    render() {
        return (
            <div className="App">
                <ChatUsersList setUserChats={this.setUserChats} chats={this.state.filteredChats} />
                <div></div>
                <Router>
                    <Header />
                    <Route path="/login" render={() => <Login setUser={this.setUser} />} />
                    <Route path="/searchUsers" render={() => <SearchUsers setFoundUsers={this.setFoundUsers} />} />
                    <Route path="/searchUsers" render={() => <UsersList foundUsers={this.state.foundUsers} />} />
                </Router>
                <SearchChat searchChats={this.searchChats}/>
            </div>
        )
    }
}
export default App;
