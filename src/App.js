import React, { useState } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Logged from './components/Logged'
import { Route, Switch, Redirect } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    const [user, setUser] = useState(undefined)
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null)
    const [appType, setAppType] = useLocalStorage('appType', null)

    const logout = () => {
        setUser(null)
        removeAuth()
    }

    return (
        <ErrorBoundary>
            <Switch>
                {auth ? 
                    <>
                        <Logged logout={logout} user={user} appType={appType} /> 
                    </> :
                        appType ?
                            <> 
                                <Route path='/register' render={() => <Register setUser={setUser} setAuth={setAuth} />}/>
                                <Route render={() => <Login setUser={setUser} setAuth={setAuth} setAppType={setAppType} />} />
                            </> :
                            <div className='type-buttons'>
                                <button onClick={() => setAppType('chatOnly')} />
                                <button onClick={() => setAppType('restaurant')} />
                            </div> 
                }
            </Switch>
        </ErrorBoundary>
    )
}

export default App;
