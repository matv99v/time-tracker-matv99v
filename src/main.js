import 'babel-core/polyfill';
import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './components/App.jsx';
import Registration from './components/Registration.jsx';



ReactDOM.render(
    <App />, document.getElementById('main-content')
);

ReactDOM.render(
    <Registration />, document.getElementById('reg')
);
