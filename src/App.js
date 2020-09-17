import React, { useCallback, useState } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Logged from './components/Logged/Logged'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './Helpers/ErrorBoundary'

const App = () => {
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null)
    const [appType, setAppType] = useLocalStorage('AppType', null)
    const [longPolling, setLongPolling] = useLocalStorage('LongPolling', '')
    const [baseUrl, setBaseUrl, removeBaseUrl] = useLocalStorage('BaseUrl', null)
    const [user, setUser] = useState()

    const logout = () => {
        setUser(null)
        removeAuth()
    }

    const setAuthUser = useCallback((user, headers) => {
        setUser(user)
        setAuth(headers.get('Authorization'))
    },[])

    const setChatApp = () => {
        setAppType('chatOnly')
        setBaseUrl('localhost:8080')
        setLongPolling('')
    }

    const setRestaurantApp = () => {
        setAppType('restaurant')
        setLongPolling('WebSocket' in window && window.WebSocket.CLOSING === 2
            ? '' 
            : 'polling/'
        )
        setBaseUrl('localhost:8095')
    }

    const resetAppType = () => {
        setAppType(undefined)
        removeBaseUrl()
    }

    return (
        <ErrorBoundary logout={logout}>
            <Router>
                {appType ?
                    !auth ? 
                        <>
                            <Logged user={user} setUser={setUser}/> 
                            <Route path='/logout'render={logout}/>
                        </> 
                        :
                        <Switch>
                            <Route path='/register' render={() => <Register setAuthUser={setAuthUser}/>}/>
                            <Route path='/login'render={() => <Login setAuthUser={setAuthUser} resetAppType={resetAppType} />}/>
                            <Redirect from='/' to='/login'/>
                        </Switch> 
                    :
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
