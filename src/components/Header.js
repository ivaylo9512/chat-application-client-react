import React, {Component} from 'react';
import SearchChat from './SearchChat';
import ChatUser from './ChatUser';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            chats : []
        }
    }
    setChats(chats){
        this.state.chats = chats
    }
    getChat(chat){
        this.props.setCurrentChat(chat)
    }
    componentDidMount(){
        console.log(localStorage.getItem('Authorization'))
        fetch('http://localhost:8080/api/auth/chat/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(data => data.json())
            .then(data => {this.setState({
                chats: data
            })
                console.log(data)})
    }
    render(){
        return (
            <header>
                <nav>
                    <SearchChat setChats={this.setChats}/>
                    {this.state.chats.map(chat =>{
                        return (
                            <a key={chat.id} onClick={() => this.getChat(chat)}>
                                <ChatUser />
                            </a>
                        )
                    })}                     
                    <a href=""></a>
                    <a href=""></a>
                </nav>
                <div className="bar">
                </div>
                <div className="chats-container">
                </div>
            </header>
        )

    }
}

export default Header