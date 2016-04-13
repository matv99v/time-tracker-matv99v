import 'babel-core/polyfill';

import { Router, Route, browserHistory } from 'react-router';

import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './components/App.jsx';
import Registration from './components/Registration.jsx';


ReactDOM.render((
        <Router history={browserHistory}>
            <Route path='time-tracker-matv99v/public/' component={Registration} />
            <Route path='/tracker' component={App} />
        </Router>
    ), document.getElementById('main-content')
);
