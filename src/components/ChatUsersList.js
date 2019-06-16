import React, {Component} from 'react';
import ChatUser from './ChatUser';

class ChatUsersList extends Component{
    constructor(){
        super()
        this.chats = React.createRef()
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/auth/chat/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        }).then(data => data.json())
          .then(data => this.props.setUserChats(data))

    }
    componentDidUpdate(){
        this.hideScrollBar()
    }
    hideScrollBar(){
        const clientHeight = this.chats.current.clientHeight 
        const offsetHeight = this.chats.current.offsetHeight
        this.chats.current.style.paddingBottom = offsetHeight - clientHeight + 'px' 
    }
    render(){
        return (
            <div className="chats-container">
                <div className="chats" ref={this.chats}>
                    {this.props.chats.map(chat =>{
                        return (
                            <a className="chat" key={chat.id} onClick={() => this.getChat(chat)}>
                                <ChatUser chat={chat}/>
                            </a>
                        )
                    })}  
                </div>
            </div>
        )
    }
}

export default ChatUsersList