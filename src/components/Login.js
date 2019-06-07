import React, {Component} from 'react';

class Login extends Component{
    render(){
        return (
            <section>
                <form>
                    <input placeholder="username" type="text"/>
                    <input placeholder="password" type="text"/>
                    <button>login</button>
                    <button>register</button>
                </form>
            </section>
        )

    }
}

export default Login