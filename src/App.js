import React, { useState, useCallback } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage'
import './App.css';
import Login from './components/Login'
import Logged from './components/Logged'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

const App = () => {
    const [user, setUser] = useState(undefined)
    const [auth, setAuth, removeAuth] = useLocalStorage('Authorization', null);

    const logout = () => {
        setUser(null)
        removeAuth()
    }

    return (
        <div className="root">
            <Router>
                {auth ? 
                    <Logged logout={logout} user={user}/> :
                    <Route path="/login" render={() => 
                        <Login setUser={setUser} setAuth={setAuth} />} />                               
                }
            </Router>
        </div>
    )
}

export default App;
