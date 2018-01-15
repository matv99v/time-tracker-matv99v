import React from 'react';

import Grid  from 'react-bootstrap/lib/Grid';
import Row   from 'react-bootstrap/lib/Row';
import Col   from 'react-bootstrap/lib/Col';

import utils from '../utils.js';
import './Logger.less';


export default class Logger extends React.Component {
    render() {
        return (
            <div className='Logger__container'>
                {
                    utils.getMessages().map((msg, i) => (
                        <div key={i}>
                            <span
                                className={msg.count > 1 ? '' : 'Logger__count__hidden'}
                            >
                                {msg.count}
                            </span>

                            <span>&nbsp;#&nbsp;</span>

                            <span>{msg.text}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
}
