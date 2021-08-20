import ReactDOM from 'react-dom';
import './index.css';
import App from 'AppRoot/App';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie11'
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
);
