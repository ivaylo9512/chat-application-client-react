import './App.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Logged from './components/Logged/Logged'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './utils/ErrorBoundary'
import { useDispatch, useSelector } from 'react-redux';
import { onLogout, getIsAuth } from './app/slices/authenticateSlice';

const App = () => {
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user');
        dispatch(onLogout());
    }

    return (
        <ErrorBoundary>
            <Router>
                {isAuth
                    ? <>
                        <Logged/> 
                        <Route path='/logout' render={logout}/>
                    </> 
                    : <Switch>
                        <Route path='/register' render={() => <Register />}/>
                        <Route path='/login'render={() => <Login />}/>
                        <Redirect from='/' to='/login'/>
                    </Switch>
                } 
            </Router>
        </ErrorBoundary>
    )
}

export default App;
