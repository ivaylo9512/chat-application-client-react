import React, {Component} from 'react';
import {Client, Message} from '@stomp/stompjs'

class WebSocket extends Component{

    componentDidMount(){
        const client = new Client({
            brokerURL: "ws://localhost:8080/api/chat/message",
            connectHeaders: {
                'Authorization': localStorage.getItem('Authorization'),
            },
            debug: function (str) {
                console.log(str)
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        })
        client.onConnect = (frame) => {
            this.props.setWebSocketClient(client)

            let newMessage = function(message) {
                console.log(message.body)
            }
            let newChat = function(message) {
                console.log(message.body)
            }
            const createSubscription = client.subscribe("/user/message", newMessage);
            const messageSubscription = client.subscribe("/user/createChat", newChat);

            setTimeout(() => {
                client.publish({destination: '/api/message', body: JSON.stringify({chatId: 22,receiverId: 6, message: "hey", username: "admin"}), headers: {'Authorization': localStorage.getItem('Authorization')}});
                client.publish({destination: '/api/createChat', body: 6, headers: {'Authorization': localStorage.getItem('Authorization')}});
            }, 3000);
        };
       
        client.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        }
        client.activate();
    }
    render(){
        return (
            <span />
        )

    }
}

export default WebSocket