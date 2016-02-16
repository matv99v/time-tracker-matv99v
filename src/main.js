import 'babel-core/polyfill';
import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './components/App.jsx';
import Reg      from './components/Reg.jsx';


ReactDOM.render(
    <App />, document.getElementById('main-content')
);

ReactDOM.render(
    <Reg />, document.getElementById('reg')
);
