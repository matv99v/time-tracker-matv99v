import 'babel-core/polyfill';

import { Router, Route, browserHistory } from 'react-router';

import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './components/App.jsx';

ReactDOM.render((
    <App/>
    ), document.getElementById('main-content')
);
