import React, {Component} from 'react';
import SearchChat from './SearchChat';
import ChatUser from './ChatUser';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            chats : []
        }
        this.chats = []
        this.searchChats = this.searchChats.bind(this)
    }
    searchChats(name){
        name = name.toUpperCase()
        const filteredChats = this.chats.filter(chat=>{ 
            const firstName = chat.user.firstName.toUpperCase()
            const lastName = chat.user.lastName.toUpperCase()
            if(firstName.startsWith(name) || lastName.startsWith(name) ||(`${firstName} ${lastName}`).startsWith(name)){
                return chat
            }
        })
        this.setState({
            chats: filteredChats 
        }) 
    }
    getChat(chat){
        this.props.setCurrentChat(chat)
    }
    componentDidMount(){
        fetch('http://localhost:8080/api/auth/chat/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(data => data.json())
            .then(data => {
                    this.setState({
                        chats: data
                    })
                    this.chats = data
                })
    }
    render(){
        return (
            <header>
                <nav>
                    <SearchChat searchChats={this.searchChats}/>                   
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