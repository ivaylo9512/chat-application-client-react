import React, { useState, useCallback } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Logged from './components/Logged'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { useRequest } from './hooks/useRequest';

const App = () => {
    const [user, setUser] = useState(undefined)
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null)
    const [appType, setAppType] = useLocalStorage('AppType', null)
    const [longPolling, setLongPolling] = useLocalStorage('LongPolling', '')
    const [baseUrl, setBaseUrl, removeBaseUrl] = useLocalStorage('BaseUrl', null)
    const [user, fetchUser, userError, setUser] = useRequest({isAuth:true})

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
        setBaseUrl('localhost:8090')
    }

    const resetAppType = () => {
        setAppType(undefined)
        removeBaseUrl()
    }

    useEffect(() => {
        if(auth && appType && !user){
            fetchUser({url:`http://${baseUrl}/api/users/${longPolling}auth/getLoggedUser`})
        }
    },[appType])

    return (
        <ErrorBoundary logout={logout}>
            <Router>
                {appType ?
                    auth ? 
                        <>
                            <Logged user={user}/> 
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
