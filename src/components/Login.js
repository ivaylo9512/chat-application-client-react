import React, {useState} from 'react';

const Login = ({setAuthenticated}) => {
    const [inputValues, setInputValues] = useState({
        username:'', password:''
    })

    const changeInput = (e) => {
        const {name, value} = e.target
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }
    const login = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/users/login', {
            method: 'post',
            body: JSON.stringify(inputValues)
          })
            .then(response =>{ 
                localStorage.setItem('Authorization', response.headers.get('Authorization'))
                return response.json()
            })
            .then(data => {
                setAuthenticated(data)
                setInputValues({username:'', password:''})
            })
    }
    return (
        <section>
            <form onSubmit={login}>
                <input value={inputValues.username} onChange={changeInput} placeholder="username" name="username" type="text"/>
                <input value={inputValues.password} onChange={changeInput} placeholder="password" name="password" type="text"/>
                <button>login</button>
                <button>register</button>
            </form>
        </section>
    )
}

export default Login