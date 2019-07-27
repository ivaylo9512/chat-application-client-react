import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Header extends Component{
    render(){
        return (
            <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">login</Link>
                            </li>
                            <li>
                                <Link to="/searchUsers">add</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={this.props.logout}>logout</Link>
                            </li>
                        </ul>                   
                    </nav>
            </header>
        )

    }
}

export default Header