import React, { Component } from 'react'

class Chat extends Component {  


    constructor(){
        this.state = {
            chats : []
        }
    }
    componentDidMount(){
        fetch('http://localhost:8080/api/chat/auth/getChats')
                .then(data => data.json())
                .then(data => this.setState({ chats: data})
        )
    }
    getNextSessions(){

    }
    render() {
        return (
            <div className="messages">
                {this.state.chats.map(chat =>{
                    return <Message key={chat.id}/>
                })}
            </div>
        )
    }
}

export default Chat