import React, {Component} from 'react';
import Users from './User'
class UsersList extends Component{

    createChat(userId){
        fetch(`http://localhost:8080/api/chat/auth/create?userId=${userId}`)        
    }

    render(){
        return (
        <div>
           {this.props.foundUsers.map(user =>{
                return(
                    <Users setCurrentChat={this.props.setCurrentChat} createChat={this.createChat} key={user.id} />
                )
            })}
        </div>
        )

    }
}

export default UsersList