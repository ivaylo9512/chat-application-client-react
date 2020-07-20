import {useRef, useEffect} from 'react';
import {Client} from '@stomp/stompjs'

const WebSocket = ({setWebSocketClient}) => {

    const isMounted = useRef(false)

    useEffect(() => {
        if(!isMounted) {
            isMounted.current = true
        }else{
            const client = new Client({
                brokerURL: 'ws://localhost:8080/api/chat/message',
                connectHeaders: {
                    'Authorization': localStorage.getItem('Authorization'),
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000
            })
            
            client.onConnect = (frame) => {
                setWebSocketClient(client)
            };
           
            client.onStompError = (frame) => {
                console.log('Broker reported error: ' + frame.headers['message']);
                console.log('Additional details: ' + frame.body);
            }
    
            client.activate();
    
        }
    }, [])

}

export default WebSocket