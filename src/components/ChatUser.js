import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class ChatUser extends Component{
    render(){
        return (
            <Link to="/chat" className="chat">
                <div>
                    <div className="image">
                        <img alt="profile" src={this.props.chat.user.profilePicture}/>
                    </div>
                    <div className="info">
                        <b>{this.props.chat.user.username}</b>
                        <span></span>    
                    </div>
                </div>
            </Link>
        )

    }
}

export default ChatUser