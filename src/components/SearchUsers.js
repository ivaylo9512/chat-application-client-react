import React, { useEffect, useState } from 'react'
import {useInput} from '../hooks/useInput'
import { useRequest } from '../hooks/useRequest';

const SearchUsers = ({setFoundUsers, searchClass}) => {  
    const [name, nameInput] = useInput({type: 'text', placeholder:'search users'})
    const [users, fetchRequest] = useRequest({initialValue: [], isAuth: true, callback: setFoundUsers})

    useEffect(() => {
        return () => setFoundUsers([])
    }, [])

    return (
        <div className={searchClass}>
            <form onSubmit={() => fetchRequest({url:`http://${localStorage.getItem('BaseUrl')}/api/users/auth/searchForUsers/${name}`})}>
                {nameInput}
                <button type='submit'><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}

export default SearchUsers