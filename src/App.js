import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import SearchUsers from './components/SearchUsers';
import ChatUsersList from './components/ChatUsersList';
import SearchChat from './components/SearchChat';



class App extends Component {
    constructor () {
        super()
        this.user = null
        this.setUser = this.setUser.bind(this)
        this.setFoundUsers = this.setFoundUsers.bind(this)
        this.searchChats = this.searchChats.bind(this)

        this.state = {
            chat: undefined,
            foundUsers: undefined,
            user: undefined,
            chats: [],
            filteredChats : []
        }
        this.findUserChats()

    }
    setUser(user){
        this.setState({
            user: user
        })
        this.findUserChats()
    }
    findUserChats(){
        fetch('http://localhost:8080/api/auth/chat/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(data => data.json())
            .then(data => {
                    this.setState({
                        filteredChats: data,
                        chats: data
                    })
                })
    }
    searchChats(name){
        name = name.toUpperCase()
        const filteredChats = this.state.chats.filter(chat=>{ 
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
    setFoundUsers(users){
        this.setState({
            foundUsers: users
        })
        console.log(users)
    }
    render() {
        return (
            <div className="App">
                <ChatUsersList chats={this.state.filteredChats} />
                <div></div>
                <Login setUser={this.setUser} />
                <SearchUsers setFoundUsers={this.setFoundUsers} />
                <SearchChat searchChats={this.searchChats}/>
            </div>
        )
    }
}
export default App;
