import React, { useState } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Logged from './components/Logged'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'

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
            <Router>
                {auth ? 
                    <>
                        <Logged logout={logout} user={user} appType={appType} /> 
                    </> :
                        appType ?
                            <Switch>
                                <Route path='/register' render={() => <Register setUser={setUser} setAuth={setAuth} />}/>
                                <Route path='/login'render={() => <Login setUser={setUser} setAuth={setAuth} setAppType={setAppType} />}/>
                                <Redirect from='/' to='/login'/>
                            </Switch> :
                            <div className='type-buttons'>
                                <button onClick={() => setAppType('chatOnly')} />
                                <button onClick={() => setAppType('restaurant')} />
                            </div> 
                }
            </Router>
            </ErrorBoundary>
    )
}

export default App;
