import 'babel-core/polyfill';

import { Router, Route, hashHistory } from 'react-router';

import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './components/App.jsx';
import Registration from './components/Registration.jsx';



ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={Registration} />
            <Route path='/tracker' component={App} />
        </Router>
    ), document.getElementById('main-content')
);
