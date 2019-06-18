import React, {Component} from 'react';

class Login extends Component{
    state = {
        username: '',
        password: ''
    }

    changeInput = (e) => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }
    login = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/login', {
            method: 'post',
            body: JSON.stringify(this.state)
          })
            .then(response =>{ 
                localStorage.setItem('Authorization', response.headers.get('Authorization'))
                return response.json()
            })
            .then(data => {
                this.props.setUser(data)
                this.setState({
                    username: '',
                    password: ''
                })
            })
    }
    render() {
        return (
            <section>
                <form onSubmit={this.login} onChange={this.changeInput}>
                    <input value={this.state.username} placeholder="username" name="username" type="text"/>
                    <input value={this.state.password} placeholder="password" name="password" type="text"/>
                    <button>login</button>
                    <button>register</button>
                </form>
            </section>
        )
    }
}

export default Login