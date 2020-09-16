import React, { useEffect } from 'react'
import { useInput } from '../../hooks/useInput'
import './Form.css'

const Form = ({callback, placeholder, searchClass, onUnmount}) => {
    const [inputValue, input] = useInput({type:'text', placeholder})

    const submit = (e) => {
        e.preventDefault()
        callback(inputValue)
    }

    useEffect(() => {
        if(onUnmount){
            return () => onUnmount('')
        }
    }, [])

    return (
        <div className={searchClass}>
            <form onSubmit={submit}>
                {input}
                <button><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}
export default Form