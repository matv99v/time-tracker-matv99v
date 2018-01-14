import 'babel-core/polyfill';

import { Router, Route, browserHistory } from 'react-router';

import React    from 'react';
import ReactDOM from 'react-dom';

import TimerEl      from './components/TimerEl.jsx';
// import Settings   from './components/Settings.jsx';
// import Dev        from './components/Dev.jsx';


ReactDOM.render((
    <TimerEl />
    ), document.getElementById('main-content')
);



// <Router history={browserHistory}>
// <Route path="/" component={Timer} />
// <Route path="/Timer" component={Timer} />
// <Route path="/Settings" component={Settings} />
// <Route path="/Dev" component={Dev} />
// </Router>
