import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Chat from './components/Chat';
import SearchUsers from './components/SearchUsers';

class App extends Component {
    constructor () {
        super()
        this.user = null
        this.setUser = this.setUser.bind(this)
        this.state = {
            chat: undefined,
            foundUsers: undefined,
            user: undefined
        }
    }
    setUser(user){
        this.setState({
            user: user
        })
    }
    setCurrentChat(chat){
        console.log(chat)
    }
    setFoundUsers(users){
        this.setState({
            foundUsers: users
        })
    }
    render() {
        return (
            <div className="App">
                <Header setCurrentChat={this.setCurrentChat} />
                <div></div>
                <Login setUser={this.setUser} />
                <SearchUsers setFoundUsers={this.setFoundUsers} />
            </div>
        )
    }
}
export default App;
