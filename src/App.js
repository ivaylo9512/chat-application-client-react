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

    const setChatApp = () => {
        setAppType('chatOnly')
        localStorage.setItem('BaseUrl', 'localhost:8080')
    }

    const setRestaurantApp = () => {
        setAppType('restaurant')
        localStorage.setItem('BaseUrl', 'localhost:8090')
    }

    const resetAppType = () => {
        setAppType(undefined)
        localStorage.removeItem('BaseUrl')
    }

    return (
        <ErrorBoundary logout={logout}>
            <Router>
                {auth ? 
                    <>
                        <Logged user={user}/> 
                        <Route path='/logout'render={logout}/>
                    </> :
                        appType ?
                            <Switch>
                                <Route path='/register' render={() => <Register setUser={setUser}/>}/>
                                <Route path='/login'render={() => <Login setUser={setUser} setAuth={setAuth} resetAppType={resetAppType} />}/>
                                <Redirect from='/' to='/login'/>
                            </Switch> :
                            <div className='type-buttons'>
                                <button onClick={setChatApp}>Chat</button>
                                <button onClick={setRestaurantApp}>Restaurant</button>
                            </div> 
                }
            </Router>
            </ErrorBoundary>
    )
}

export default App;
