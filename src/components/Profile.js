import React from 'react';
import { useRequest } from '../hooks/useRequest';

const Profile = () => {
    const [userInfo] = useRequest({initialUrl: `http://${localStorage.getItem('BaseUrl')}/api/users/auth/getUserInfo`, fetchOnMount: true, isAuth})
    
    return (
        <div className='profile'>
            <button>back</button>
            <div class='image-container'>
                <img src={userInfo.profilePicture}/>
            </div>
            <div class='info'>
                <label>{userInfo.firstName}</label>
                <label>{userInfo.lastName}</label>
                <label>{userInfo.age}</label>
                <label>{userInfo.country}</label>
                <label>{userInfo.role}</label>
            </div>
            <div class='buttons'>
                <a href=''></a>
                <a href=''></a>
                <a href=''></a>
            </div>
        </div>
    )
}

export default Profile