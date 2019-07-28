import React, { Component } from 'react'

class SearchUsers extends Component {  

    state = {
        name: ''
    }

    changeInput = (e) => {
        const{name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    searchUsers = (e) => {
        e.preventDefault()
        const name = this.state.name
        
        fetch(`http://localhost:8080/api/users/auth/searchForUsers/${name}`, {
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(response => response.json())
            .then(data => this.props.setFoundUsers(data))
    }
    
    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.searchUsers}>
                    <input name="name" placeholder="search users" value={this.state.name} onChange={this.changeInput}/>
                    <button><i className="fas fa-search"></i></button>
                </form>
            </div>
        )
    }
}

export default SearchUsers