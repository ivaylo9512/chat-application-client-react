import React from 'react'
import { useInput } from '../hooks/useInput' 
const SearchChat = searchChats => {  

    const [name, setName, nameInput] = useInput({type: 'text', placeholder:'search chat'})
    
    return (
        <div className='form-container'>
            <form onSubmit={() => searchChats(name)}>
                {nameInput}
                <button><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}

export default SearchChat