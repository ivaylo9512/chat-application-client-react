import React, {Component} from 'react';
import ChatUser from './ChatUser';
import smoothscroll from 'smoothscroll-polyfill';

class ChatUsersList extends Component{
    constructor(){
        super()
        this.chats = React.createRef()
        this.chatsContainer = React.createRef()
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        }).then(data => data.json())
          .then(data => this.props.setUserChats(data))
          smoothscroll.polyfill()

          this.props.setChatList(this.chatsContainer)
    }
    componentDidUpdate(){
        this.hideScrollBar()
    }
    
    hideScrollBar(){
        const clientHeight = this.chats.current.clientHeight
        const offsetHeight = this.chats.current.offsetHeight

        const height = parseFloat(window.getComputedStyle(this.chats.current).height)
        const containerHeight = parseFloat(window.getComputedStyle(this.chatsContainer.current).height)
        const paddingBottom = window.getComputedStyle(this.chatsContainer.current).paddingBottom


        const barHeight = containerHeight - height 
        const newHeight = offsetHeight > clientHeight && height >= containerHeight ? height + paddingBottom : Math.max(containerHeight, containerHeight + barHeight)
        

        this.chats.current.style.height = `${newHeight}px` 
        this.chats.current.style.paddingBottom = `${barHeight}px`
    }
    scroll = (e) => {
        e.currentTarget.scroll({left: e.currentTarget.scrollLeft + e.deltaY * 4 , top: e.currentTarget.scrollTop, behavior: 'smooth'})
        
    }
    render(){
        return (
            <div className="chat-users" ref={this.chatsContainer}>
                <div ref={this.chats} onWheel = {this.scroll}>
                    {this.props.chats.map(chat => {
                        return (
                            <div className="chat-user" key={chat.id} onClick={() => this.props.setChat(chat)}> 
                                <ChatUser chat={chat}/>
                            </div>
                        )
                    })}  
                </div>
            </div>
        )
    }
}

export default ChatUsersList