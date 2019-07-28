import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import ChatUsersList from './components/ChatUsersList';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main';

class App extends Component {
    state = {
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

    setCurrentChat = (currentChat) => {
        this.setState({
            currentChat
        })
    }


    componentDidMount(){
        this.setState({ 
            isAuth: localStorage.getItem('Authorization') !== null
        }) 

    }

    render() {
        return (
            <div className="App">
                <Router>
                    {this.state.isAuth && <ChatUsersList setChatList={chatList => (this.chatList = chatList)} setCurrentChat={this.setCurrentChat} setUserChats={this.setUserChats} chats={this.state.filteredChats} />}
                    <Route path="/login" render={() => <Login setUser={this.setUser} />} />                               
                    {this.state.isAuth && 
                        <div className="content">
                            <Header chatList={this.chatList} logout={this.logout} />
                            <Main searchChats={this.searchChats} currentChat={this.state.currentChat}/>
                        </div>
                    }
                </Router>
            </div>
        )
    }
}

export default App;
