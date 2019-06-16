import React,{ component } from 'react'

class MessageForm extends Comment {
    
    submitForm = (e) => {

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