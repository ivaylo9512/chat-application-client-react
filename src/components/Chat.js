import React, { Component } from 'react'

class Chat extends Component {  


    constructor(){
        this.state = {
            chats : []
        }
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