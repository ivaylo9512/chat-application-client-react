import React, { useState } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login'
import Logged from './components/Logged'
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

const App = () => {
    const [user, setUser] = useState(undefined)
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null)
    const [appType, setAppType] = useLocalStorage('appType', null)

    const logout = () => {
        setUser(null)
        removeAuth()
    }

    return (
        <div className='root'>
            <Router>
                {auth ? 
                    <>
                        <Logged logout={logout} user={user} appType={appType} /> 
                        <Redirect from='login' to='/' />
                    </> :
                    <Route path='/login' render={() => 
                        appType ? 
                            <Login setUser={setUser} setAuth={setAuth} /> :
                            <div className='type-buttons'>
                                <button onClick={() => setAppType('chatOnly')} />
                                <button onClick={() => setAppType('restaurant')} />
                            </div> 
                    } 
                    />                               
                }
            </Router>
        </div>
    )
}

export default App;
