import React, {Component} from 'react';

class Register extends Component{
    state = {
        username: '',
        password: '',
        repeat: ''
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    register = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/users/register', {
            method: 'post',
            body: JSON.stringify(this.state)
        })
          .then(data =>  data.json())
          .then(data => {
              this.props.setUser(data)
          }
        )
    }
    render(){
        return (
            <section>
                <form onSubmit={this.login} onChange={this.changeInput}>
                    <input placeholder="username" name="username" type="text"/>
                    <input placeholder="password" name="password" type="password"/>
                    <input placeholder="repeat" name="repeat" type="password"/>
                    <button>login</button>
                    <button>register</button>
                </form>
            </section>
        )
    }
}

export default Register