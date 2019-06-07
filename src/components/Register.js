import React, {Component} from 'react';

class Register extends Component{
    render(){
        return (
            <section>
                <form>
                    <input placeholder="username" type="text"/>
                    <input placeholder="password" type="text"/>
                    <input placeholder="repeat" type="text"/>
                    <button>register</button>
                    <button>login</button>
                </form>
            </section>
        )

    }
}

export default Login