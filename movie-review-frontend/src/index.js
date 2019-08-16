import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
//import { createStore } from 'redux';
//import rootReducer from './reducers';
//import { store } from './createStore';
//import store from './configureStore';

import { store } from './createStore';


/*const store = createStore(rootReducer, 
	window.STATE_FROM_SERVER);*/

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
