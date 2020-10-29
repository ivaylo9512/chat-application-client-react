import {useRef, useEffect} from './node_modules/react';
import {Client} from './node_modules/@stomp/stompjs'

const WebSocket = ({setWebSocketClient}) => {

    useEffect(() => {
        const client = new Client({
            brokerURL: `ws://${localStorage.getItem('BaseUrl')}/api/chat/message`,
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
            console.log('Additional details: ' + frame.body)
        }

        client.activate()

        return () => client.deactivate()
    }, [])

    return null
}

export default WebSocket