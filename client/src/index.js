import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import store from './store';
import { Provider } from 'react-redux';

const ele = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));