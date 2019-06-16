import React, {Component} from 'react';
import { Route,Link, BrowserRouter as Router } from 'react-router-dom'

class Header extends Component{
    constructor(){
        super()
    }
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
                        </ul>                   
                        <a href=""></a>
                        <a href=""></a>
                    </nav>
            </header>
        )

    }
}

export default Header