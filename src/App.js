import React, { useState } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
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
        <Router>
            {auth ? 
                <>
                    <Logged logout={logout} user={user} appType={appType} /> 
                    <Redirect from='login' to='/' />
                </> :
                    appType ?
                        <> 
                            <Route path='/login' render={() => <Login setUser={setUser} setAuth={setAuth} setAppType={setAppType} />}/>
                            <Route path='/register' render={() => <Register setUser={setUser} setAuth={setAuth} />}/>
                            <Redirect to="/login" />
                        </> :
                        <div className='type-buttons'>
                            <button onClick={() => setAppType('chatOnly')} />
                            <button onClick={() => setAppType('restaurant')} />
                        </div> 
            }
        </Router>
    )
}

export default App;
