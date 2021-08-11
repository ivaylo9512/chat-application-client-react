import React from 'react';
import { IMAGE_URL } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward } from '@fortawesome/free-solid-svg-icons'

const UserChat = ({userChat: {secondUser}}) => {

    return(
        <div>
            <div className='image-container'>
                <img src={`${IMAGE_URL}/${secondUser.profileImage}`}/>
            </div>
            <span><b>{secondUser.firstname}</b></span>
            <span>Created At: <b>{secondUser.createdAt}</b></span>
            <button><FontAwesomeIcon icon={faForward}/></button>
        </div>
    )
}
export default UserChat