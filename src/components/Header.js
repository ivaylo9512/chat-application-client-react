import React, {Component} from 'react';
import SearchChat from './SearchChat';

class Header extends Component{
    constructor(){
        super()
        this.chats = []
    }
    setChats(chats){
        this.chats = chats
    }
    render(){
        return (
            <header>
                <nav>
                    <SearchChat setChats={this.setChats}/>
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