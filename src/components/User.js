import React, {Component} from 'react';

class User extends Component{
    render(){
        return (
        <div>
            <div className="image">
                <img alt="profile" src={this.props.user.profilePicture}/>
            </div>
            <div className="info">
                <b>{this.props.user.username}</b>
                <span></span>    
            </div>
            <button onClick={()=> this.props.user.hasChatWithLoggedUser ? : this.props.createChat} ></button>
        </div>
        )

    }
}

export default User