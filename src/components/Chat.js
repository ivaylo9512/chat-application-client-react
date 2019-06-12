import React, { Component } from 'react'
import Session from './Session';

class Chat extends Component {  


    constructor(){
        super()
    }
    getNextSessions(){

    }
    render() {
        return (
            <div className="sessions">
                {this.props.chat.sessions.map(session =>{
                    return <Session session={session} key={session.id}/>
                })}
            </div>
        )
    }
}

export default Chat