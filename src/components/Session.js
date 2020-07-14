import React, { Component } from 'react'
import Message from './Message';

class Session extends Component {  

    render() {
        return (
            <div className='messages'>
                {this.props.session.messages.map(message =>{
                    return <Message key={message.time}/>
                })}
            </div>
        )
    }
}

export default Session