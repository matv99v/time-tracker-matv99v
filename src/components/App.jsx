import React from 'react';
import Button from 'react-bootstrap/lib/Button';


import Example from './Example.jsx';
import UserAccountControls from './UserAccountControls.jsx';

export default props => (
    <div>
        <h1>Time tracker</h1>
        <UserAccountControls/>
        <Example/>
        <Button bsStyle="primary">Start timer</Button>
    </div>
);
