import Session from 'components/Session/Session';
import Form from 'components/Form/Form'
import { useSelector } from 'react-redux';
import { getCurrentChat } from 'app/slices/chatsSlice';

const ChatView = ({webSocketClient}) => {  
    const chat = useSelector(getCurrentChat);


    const sendNewMessage = (message) => { 
        const chatId = chat.id
        const receiverId = chat.user.id
        webSocketClient.publish({destination: '/api/message', body: JSON.stringify({chatId, receiverId, message}), headers: {'Authorization': localStorage.getItem('Authorization')}});
    }

    return (
        <>
            {chat ? 
                <div className='chat-container'>
                    <Form sendNewMessage={sendNewMessage}/>
                    <div className='chat'>
                        {chat.sessions.map(session =>{
                            return <Session session={session} key={session.date}/>
                        })}
                    </div>
                </div>
                : <p>No chat is selected!</p>
            }
        </>
    )
}

export default ChatView