import React, {Component} from 'react';

class ChatUser extends Component{
    render(){
        return (
            <div>
                <div className="image">
                    <img alt="profile" src={this.props.chat.firstUser.profilePicture}/>
                </div>
                <div className="info">
                    <b>{this.props.chat.firstUser.username}</b>
                    <span></span>    
                </div>
            </div>
        )

    }
}

export default ChatUser