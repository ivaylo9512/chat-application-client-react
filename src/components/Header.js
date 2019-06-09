import React, {Component} from 'react';
import SearchChat from './SearchChat';

class Header extends Component{
    render(){
        return (
            <header>
                <nav>
                    <SearchChat setChat={this.props.setChat}/>
                    <a href=""></a>
                    <a href=""></a>
                </nav>
                <div className="bar">
                </div>
                <div className="chats-container">
                </div>
            </header>
        )

    }
}

export default Header