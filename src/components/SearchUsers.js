import React, { Component } from 'react'

class SearchUsers extends Component {  

    state = {
        name: ''
    }
    changeInput = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    searchUsers = (e) => {
        e.preventDefault()
        const name = this.state.name
        fetch(`http://localhost:8080/api/users/searchForUsers/${name}`)
            .then(response => response.json())
            .then(data => this.props.setFoundUsers(data)
        )
    }
    
    render() {
        return (
            <form onSubmit={this.searchUsers}>
                <input value={this.state.name} onChange={this.changeInput}/>
            </form>
        )
    }
}

export default SearchUsers