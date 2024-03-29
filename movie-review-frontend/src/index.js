import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { store } from './createStore';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
