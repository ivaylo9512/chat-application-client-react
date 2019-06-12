import React, { Component } from 'react'
import Message from './Message';

class Session extends Component {  

    render() {
        return (
            <div className="messages">
                {this.props.session.messages.map(message =>{
                    return <Message key={message.id}/>
                })}
            </div>
        )
    }
}

export default Session