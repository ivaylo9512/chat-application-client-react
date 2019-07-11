import React, {Component} from 'react';
import { Route,Link, BrowserRouter as Router } from 'react-router-dom'

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
            <button onClick={()=> this.props.user.hasChatWithLoggedUser 
                ? 
                    this.props.history.push('/chat') &&
                    this.props.setCurrentChat(this.props.user.id)  
                    : this.props.createNewChat} ></button>
        </div>
        )

    }
}

export default User