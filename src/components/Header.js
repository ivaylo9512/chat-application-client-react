import React, {Component} from 'react';


class Header extends Component{
    constructor(){
        super()
        this.searchChats = this.searchChats.bind(this)
    }
    getChat(chat){
        this.props.setCurrentChat(chat)
    }
    render(){
        return (
            <header>
                <nav>                   
                    <a href=""></a>
                    <a href=""></a>
                </nav>
            </header>
        )

    }
}

export default Header