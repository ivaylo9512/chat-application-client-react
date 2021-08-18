import React from 'react'
import Message from 'components/Message/Message';

const Session =  ({session}) =>  {  

    return (
        <div className='messages'>
            {session.messages.map(message =>{
                return <Message key={message.time}/>
            })}
        </div>
    )
}

export default Session