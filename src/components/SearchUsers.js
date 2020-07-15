import React, { Component } from 'react'
import {useInput} from '../hooks/useInput'

const SearchUsers = () => {  
    const [name, setName, nameInput] = useInput({type: 'text', placeholder:'search users'})

    const searchUsers = (e) => {
        e.preventDefault()
        
        fetch(`http://localhost:8080/api/users/auth/searchForUsers/${name}`, {
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(response => response.json())
            .then(data => this.props.setFoundUsers(data))
    }
    
    return (
        <div className='form-container'>
            <form onSubmit={searchUsers}>
                {nameInput}
                <button type='submit'><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}

export default SearchUsers