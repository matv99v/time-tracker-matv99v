import 'babel-core/polyfill';

import { Router, Route, browserHistory } from 'react-router';

import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './components/App.jsx';
import Registration from './components/Registration.jsx';

const url = window.location.pathname;
console.log(url);

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path={url} component={Registration} />
            <Route path={url + 'tracker'} component={App} />
        </Router>
    ), document.getElementById('main-content')
);
