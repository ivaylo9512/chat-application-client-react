import React, {Component} from 'react';
import Users from './User'
class UsersList extends Component{
    render(){
        return (
        <div>
           {this.props.foundUsers.map(user =>{
                return(
                    <Users />
                )
            })}
        </div>
        )

    }
}

export default UsersList