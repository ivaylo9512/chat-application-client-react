import React, { Component } from 'react'
import { Session } from 'inspector';

class Chat extends Component {  


    constructor(){
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