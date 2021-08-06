import React from 'react';
import './App.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Logged from './components/Logged/Logged'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './helpers/ErrorBoundary'
import { useDispatch } from 'react-redux';
import { onLogout } from './app/slicers/authenticate';

const App = () => {
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user');
        dispatch(onLogout());
    }

    return (
        <ErrorBoundary>
            <Router>
                {auth 
                    ? <>
                        <Logged/> 
                        <Route path='/logout' render={logout}/>
                    </> 
                    : <Switch>
                        <Route path='/register' render={() => <Register setAuthUser={setAuthUser}/>}/>
                        <Route path='/login'render={() => <Login setAuthUser={setAuthUser} resetAppType={resetAppType} />}/>
                        <Redirect from='/' to='/login'/>
                    </Switch>
                } 
            </Router>
        </ErrorBoundary>
    )
}

export default App;
