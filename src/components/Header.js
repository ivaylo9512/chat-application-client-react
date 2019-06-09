import React, {Component} from 'react';
import SearchChat from './SearchChat';
import ChatUser from './ChatUser';

class Header extends Component{
    constructor(){
        super()
        this.chats = []
    }
    setChats(chats){
        this.chats = chats
    }
    getChat(chat){
        this.props.setCurrentChat(chat)
    }
    render(){
        return (
            <header>
                <nav>
                    <SearchChat setChats={this.setChats}/>
                    {this.state.chats.map(chat =>{
                        return (
                            <a onClick={this.getChat(chat)}>
                                <ChatUser key={chat.id}/>
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