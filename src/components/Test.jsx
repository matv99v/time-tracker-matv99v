import React       from 'react';
import Button      from 'react-bootstrap/lib/Button';
import Panel       from 'react-bootstrap/lib/Panel';

import ts          from '../timersStorage.js';




export default class Test extends React.Component {
    logTimers = () => {
        console.log('logTimers', ts.getAllTimers());
    };

    render() {
        return (
            <Panel bsStyle="warning">
                <Button onClick = {this.logTimers}
                >
                    Log timers storage
                </Button>
            </Panel>

        );
    }
}
