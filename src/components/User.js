import React, {Component} from 'react';

class User extends Component{
    render(){
        return (
        <div>
            <div className="image">
                <img alt="profile" src={this.props.chat.user.profilePicture}/>
            </div>
            <div className="info">
                <b>{this.props.chat.user.username}</b>
                <span></span>    
            </div>
            <button></button>
        </div>
        )

    }
}

export default User