import React, { Component } from 'react'

class Message extends Component {  
    render() {
        return (
            <div className="message">
                <b className="user">{this.props.user}</b>
                <span className="time"></span>
                <p className="text">{this.props.text}</p>
            </div>
        )
    }
}

export default Message