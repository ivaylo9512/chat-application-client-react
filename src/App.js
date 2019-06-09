import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'

class App extends Component {
    constructor () {
        super()
        this.user = null
        this.setUser = this.setUser.bind(this)

    }
    setUser(user){
        this.user = user
    }
    render() {
        return (
            <div className="App">
                <Login setUser={this.setUser} />
            </div>
        )
    }
}
export default App;
