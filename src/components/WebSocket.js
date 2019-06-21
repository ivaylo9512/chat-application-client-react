import React, {Component} from 'react';
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

class WebSocket extends Component{

    componentWillMount(){
        const socket = new WebSocket('ws://localhost:8080/api/chat/message');
        const ws = Stomp.over(socket);

        ws.connect({'Authorization': localStorage.getItem('Authorization') }, function(frame) {
            ws.subscribe("/user/queue/errors", function(message) {
                alert("Error " + message.body);
            });
     
            ws.subscribe("/user/queue/reply", function(message) {
                alert("Message " + message.body);
            });
        }, function(error) {
            alert("STOMP error " + error);
        });
    }
    render(){
        return (
            <span />
        )

    }
}

export default WebSocket