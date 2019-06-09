import React, {Component} from 'react';

class Login extends Component{

    constructor(){
        super()
        this.login = this.login.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.state = {
            username: '',
            password: ''
        }
    }
    changeInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    login(e){
        e.preventDefault()
        fetch('http://localhost:8080/login', {
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
                    <input placeholder="password" name="password" type="text"/>
                    <button>login</button>
                    <button>register</button>
                </form>
            </section>
        )
    }
}

export default Login