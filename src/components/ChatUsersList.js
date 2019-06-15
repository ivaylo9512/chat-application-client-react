import React, {Component} from 'react';
import ChatUser from './ChatUser';

class ChatUsersList extends Component{
    render(){
        return (
            <div className="chats">
                {this.props.chats.map(chat =>{
                    return (
                        <a className="chat" key={chat.id} onClick={() => this.getChat(chat)}>
                            <ChatUser chat={chat}/>
                        </a>
                    )
                })}  
            </div>
        )
    }
}

export default ChatUsersList