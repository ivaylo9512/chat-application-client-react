import React, { Component } from 'react'

class SearchChat extends Component {  


    constructor(){
        super()
        this.state = {
            name : ''
        }
        this.changeInput = this.changeInput.bind(this)
        this.getChat = this.getChat.bind(this)
    }

    changeInput(e){
        this.setState({
            name : e.target.value
        })
    }
    getChat(){
        fetch(`http://localhost:8080/api/chat/auth/getChats/${this.state.name}`)
                .then(data => data.json())
                .then(data => this.props.setChat(data))
    }
    getNextSessions(){

    }
    render() {
        return (
            <form onSubmit={this.getChat}>
                <input onChange={this.changeInput}/>
            </form>
        )
    }
}

export default SearchChat