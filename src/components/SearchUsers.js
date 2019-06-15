import React, { Component } from 'react'

class SearchUsers extends Component {  


    constructor(){
        super()
        this.state = {
            name : ''
        }
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