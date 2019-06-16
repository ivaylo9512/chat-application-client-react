import React,{ component } from 'react'

class MessageForm extends Comment {
    state = {
        message : ''
    }
    submitForm = (e) => {
        const{name, value} = e.target
        this.setState({
            message: value
        })
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <input placeholder="Send message"/>
                <button>send</button>
            </form>
        )
    }
}

export default MessageForm