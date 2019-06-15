import React, {Component} from 'react';

class UsersList extends Component{
    render(){
        return (
        <div>
           {this.props.users.map(user =>{
                return(
                    <Users />
                )
            })}
        </div>
        )

    }
}

export default UsersList