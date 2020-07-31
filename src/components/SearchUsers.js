import React, { useEffect, useState } from 'react'
import {useInput} from '../hooks/useInput'

const SearchUsers = ({setFoundUsers, searchClass}) => {  
    const [name, nameInput] = useInput({type: 'text', placeholder:'search users'})
    const [url, setUrl] = useState(undefined)
    const [error, setError] = useState(undefined)

    useEffect(() => {
        let isCurrent = true;
        if(url){
            async function searchUsers(){
                const response = await fetch(url, {
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        setFoundUsers(JSON.parse(data))
                    }else{
                        setError(data)
                    }
                }
            }
            searchUsers()
        }    
        return () => {
            isCurrent = false
        }
    }, [url, setFoundUsers])
    
    
    return (
        <div className={searchClass}>
            <form onSubmit={() => setUrl(`http://${localStorage.getItem('BaseUrl')}/api/users/auth/searchForUsers/${name}`) }>
                {nameInput}
                <button type='submit'><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}

export default SearchUsers