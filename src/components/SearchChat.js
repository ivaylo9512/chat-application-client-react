import React, { useEffect } from 'react'
import { useInput } from '../hooks/useInput' 
const SearchChat = ({searchChats}) => {  
    const [name, nameInput] = useInput({type: 'text', placeholder:'search chat'})
    
    const search = (e) => {
        e.preventDefault()
        searchChats(name)
    }

    useEffect(() => {
        return () => searchChats('')
    }, [])
    
    return (
        <div className='form-container'>
            <form onSubmit={search}>
                {nameInput}
                <button><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}

export default SearchChat