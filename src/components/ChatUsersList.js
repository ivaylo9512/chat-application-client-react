import React, {Component} from 'react';
import ChatUser from './ChatUser';

class ChatUsersList extends Component{
    componentDidMount() {
        fetch('http://localhost:8080/api/auth/chat/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(data => data.json())
            .then(data => this.props.setUserChats(data))
    }
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