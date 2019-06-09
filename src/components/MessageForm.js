import React,{ component } from 'react'

class MessageForm extends Comment {
    constructor() {
        super()
        this.submitForm = this.submitForm.bind(this)
    }
    
    submitForm(e) {

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