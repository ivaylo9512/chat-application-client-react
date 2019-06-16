import React, {Component} from 'react';
import ChatUser from './ChatUser';

class ChatUsersList extends Component{
    constructor(){
        super()
        this.chats = React.createRef()
        this.chatsContainer = React.createRef()
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
        const clientHeight = parseFloat(window.getComputedStyle(this.chats.current).height)
        const offsetHeight = parseFloat(window.getComputedStyle(this.chatsContainer.current).height)

        const barHeight = offsetHeight - clientHeight 
        const newHeight = Math.max(offsetHeight, offsetHeight + barHeight)
        this.chats.current.style.height = `calc(${newHeight}px)` 
    }
    render(){
        return (
            <div className="chats-container" ref={this.chatsContainer}>
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