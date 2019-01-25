import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth.js';
import userReducer from './store/reducers/users.js';
import messageReducer from './store/reducers/message.js';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

const rootReducer=combineReducers({
	users:userReducer,
	auth:authReducer,
	message:messageReducer});
//const composeEnhancers = null|| compose;
const composeEnhancers = process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;

const store=createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));

const app=(<Provider store={store}>
	<BrowserRouter>
	<App/>
	</BrowserRouter>
	</Provider>);
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
