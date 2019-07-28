import React, { Component } from 'react';

class MessageForm extends Component {
    state = {
        message : ''
    }
    submitForm = (e) => {
        e.preventDefault()

        this.props.sendNewMessage(this.state.message)
    }

    changeMessage = (e) => {
        const{name, value} = e.target

        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div class="form-container">
                <form onSubmit={this.submitForm}>
                    <input name='message' value={this.state.message} onChange={this.changeMessage} placeholder='Send message'/>
                    <button><i class="fas fa-sign-in-alt"></i></button>
                </form>
            </div>
        )
    }
}

export default MessageForm