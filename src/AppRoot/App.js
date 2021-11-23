import Login from 'components/Login/Login'
import Register from 'components/Register/Register'
import Logged from 'components/Logged/Logged'
import Logout from 'components/Logout/Logout'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getIsAuth } from 'app/slices/authenticateSlice';

const App = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <>
            {isAuth
                ? <>
                    <Logged/> 
                    <Route path='/logout' render={() => <Logout />} />
                </> 
                : <Switch>
                    <Route path='/register' render={() => <Register />}/>
                    <Route data-testid='login' path='/login'render={() => <Login />}/>
                    <Redirect from='/' to='/login'/>
                </Switch>
            } 
        </>
    )
}

export default App;
