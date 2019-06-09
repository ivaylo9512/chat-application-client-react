import React, { Component } from 'react'

class SearchChat extends Component {  


    constructor(){
        super()
        this.state = {
            name : ''
        }
        this.changeInput = this.changeInput.bind(this)
        this.findChats = this.findChats.bind(this)
    }

    changeInput(e){
        this.setState({
            name : e.target.value
        })
    }
    findChats(){
        fetch(`http://localhost:8080/api/chat/auth/getChats/${this.state.name}`)
                .then(data => data.json())
                .then(data => this.props.setChats(data))
    }
    render() {
        return (
            <form onSubmit={this.findChat}>
                <input onChange={this.changeInput}/>
            </form>
        )
    }
}

export default SearchChat