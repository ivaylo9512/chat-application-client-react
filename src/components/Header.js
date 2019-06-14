import React, {Component} from 'react';
import SearchChat from './SearchChat';
import ChatUser from './ChatUser';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            chats : []
        }
    }
    setChats(chats){
        this.state.chats = chats
    }
    getChat(chat){
        this.props.setCurrentChat(chat)
    }
    componentDidMount(){
        console.log(localStorage.getItem('Authorization'))
        fetch('http://localhost:8080/api/auth/chat/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(data => data.json())
            .then(data => {this.setState({
                chats: data
            })
                console.log(data)})
    }
    render(){
        return (
            <header>
                <nav>
                    <SearchChat setChats={this.setChats}/>                   
                    <a href=""></a>
                    <a href=""></a>
                </nav>
                <div className="chats">
                    {this.state.chats.map(chat =>{
                        return (
                            <a className="chat" key={chat.id} onClick={() => this.getChat(chat)}>
                                <ChatUser chat={chat}/>
                            </a>
                        )
                    })}  
                </div>
            </header>
        )

    }
}

export default Header