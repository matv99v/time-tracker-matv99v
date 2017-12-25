import React       from 'react';
import Button      from 'react-bootstrap/lib/Button';
import Panel       from 'react-bootstrap/lib/Panel';

import ts          from '../timersStorage.js';




export default class Test extends React.Component {
    logTimers = () => {
        console.log('logTimers', ts.getAllTimers());
    };

    logLocalStorage = () => {
        console.log('logLocalStorage', localStorage);
    };

    clearLocalStorage = () => {
        console.log('clearLocalStorage', localStorage.clear());
    };

    render() {
        return (
            <Panel bsStyle="warning">
                <Button onClick = {this.logTimers}
                >
                    Log timers
                </Button>

                <Button onClick = {this.logLocalStorage}
                >
                    Log local storage
                </Button>

                <Button onClick = {this.clearLocalStorage}
                >
                    Clear local storage
                </Button>
            </Panel>

        );
    }
}
